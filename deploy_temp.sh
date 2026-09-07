#!/usr/bin/env bash
#
# 静态网站一键部署脚本（Nginx + HTTPS）
# 用法：修改下方配置后执行 ./deploy.sh
#
set -euo pipefail

# ==================== 配置区域（请修改） ====================
SSH_HOST="new-world-hk-01.2fish.com.cn"   # 服务器 IP 或域名
SSH_USER="root"                       # SSH 用户名（需有 root/sudo 权限）
SSH_PASSWORD=""                       # SSH 密码
SSH_PORT="22"                         # SSH 端口

REMOTE_WEB_ROOT="/var/www/zhongyuan"  # 服务器网站根目录
DOMAIN="jhd-ceramics.com www.jhd-ceramics.com"  # 访问域名
NGINX_SITE_NAME="zhongyuan"           # Nginx 站点配置名

# HTTPS 证书（相对项目根目录）
SSL_CERT_FILE="cert/www.jhd-ceramics.com.pem"
SSL_KEY_FILE="cert/www.jhd-ceramics.com.key"
REMOTE_SSL_DIR="/etc/nginx/ssl/zhongyuan"
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 -p "${SSH_PORT}")

# ---------- 本地依赖检查 ----------
check_local_deps() {
  if ! command -v sshpass &>/dev/null; then
    echo "错误: 未找到 sshpass，请先安装："
    echo "  macOS:   brew install hudochenkov/sshpass/sshpass"
    echo "  Ubuntu:  sudo apt-get install -y sshpass"
    echo "  CentOS:  sudo yum install -y sshpass"
    exit 1
  fi
  if ! command -v rsync &>/dev/null; then
    echo "错误: 未找到 rsync，请先安装 rsync"
    exit 1
  fi
}

check_ssl_files() {
  if [[ ! -f "${SCRIPT_DIR}/${SSL_CERT_FILE}" ]]; then
    echo "错误: 找不到证书文件 ${SSL_CERT_FILE}"
    exit 1
  fi
  if [[ ! -f "${SCRIPT_DIR}/${SSL_KEY_FILE}" ]]; then
    echo "错误: 找不到私钥文件 ${SSL_KEY_FILE}"
    exit 1
  fi
}

ssh_run() {
  sshpass -p "${SSH_PASSWORD}" ssh "${SSH_OPTS[@]}" "${SSH_USER}@${SSH_HOST}" "$@"
}

rsync_upload_site() {
  sshpass -p "${SSH_PASSWORD}" rsync -avz --delete \
    --exclude '.git/' \
    --exclude '.idea/' \
    --exclude '*.bak' \
    --exclude 'deploy.sh' \
    --exclude '.DS_Store' \
    --exclude 'cert/' \
    --exclude '*.key' \
    --exclude '*.pem' \
    --exclude '*.zip' \
    -e "ssh ${SSH_OPTS[*]}" \
    "${SCRIPT_DIR}/" "${SSH_USER}@${SSH_HOST}:${REMOTE_WEB_ROOT}/"
}

upload_ssl_certs() {
  ssh_run "mkdir -p '${REMOTE_SSL_DIR}' && chmod 700 '${REMOTE_SSL_DIR}'"
  sshpass -p "${SSH_PASSWORD}" rsync -avz \
    -e "ssh ${SSH_OPTS[*]}" \
    "${SCRIPT_DIR}/${SSL_CERT_FILE}" \
    "${SCRIPT_DIR}/${SSL_KEY_FILE}" \
    "${SSH_USER}@${SSH_HOST}:${REMOTE_SSL_DIR}/"
  ssh_run "chmod 644 '${REMOTE_SSL_DIR}/$(basename "${SSL_CERT_FILE}")' && chmod 600 '${REMOTE_SSL_DIR}/$(basename "${SSL_KEY_FILE}")'"
}

# ---------- 远程：安装 Nginx 并配置站点 ----------
remote_setup() {
  local remote_cert="${REMOTE_SSL_DIR}/$(basename "${SSL_CERT_FILE}")"
  local remote_key="${REMOTE_SSL_DIR}/$(basename "${SSL_KEY_FILE}")"

  ssh_run "bash -s" <<REMOTE_SCRIPT
set -euo pipefail

REMOTE_WEB_ROOT="${REMOTE_WEB_ROOT}"
DOMAIN="${DOMAIN}"
NGINX_SITE_NAME="${NGINX_SITE_NAME}"
REMOTE_CERT="${remote_cert}"
REMOTE_KEY="${remote_key}"

install_nginx() {
  if command -v nginx &>/dev/null; then
    echo "[远程] Nginx 已安装: \$(nginx -v 2>&1)"
    return 0
  fi

  echo "[远程] Nginx 未安装，开始安装..."

  if [ -f /etc/os-release ]; then
    # shellcheck source=/dev/null
    . /etc/os-release
  else
    echo "错误: 无法识别操作系统"
    exit 1
  fi

  case "\${ID:-}" in
    ubuntu|debian)
      export DEBIAN_FRONTEND=noninteractive
      apt-get update -qq
      apt-get install -y nginx
      ;;
    centos|rhel|rocky|almalinux|fedora)
      if command -v dnf &>/dev/null; then
        dnf install -y nginx
      else
        yum install -y nginx
      fi
      ;;
    *)
      echo "错误: 不支持的系统 \${ID}，请手动安装 Nginx 后重试"
      exit 1
      ;;
  esac

  echo "[远程] Nginx 安装完成: \$(nginx -v 2>&1)"
}

open_firewall() {
  if command -v ufw &>/dev/null && ufw status 2>/dev/null | grep -q "Status: active"; then
    ufw allow 80/tcp >/dev/null || true
    ufw allow 443/tcp >/dev/null || true
    echo "[远程] ufw 已放行 80/443"
  elif command -v firewall-cmd &>/dev/null && systemctl is-active --quiet firewalld 2>/dev/null; then
    firewall-cmd --permanent --add-service=http >/dev/null || true
    firewall-cmd --permanent --add-service=https >/dev/null || true
    firewall-cmd --reload >/dev/null || true
    echo "[远程] firewalld 已放行 http/https"
  fi
}

write_nginx_config() {
  if [[ ! -f "\${REMOTE_CERT}" || ! -f "\${REMOTE_KEY}" ]]; then
    echo "错误: 远程证书不存在: \${REMOTE_CERT} / \${REMOTE_KEY}"
    exit 1
  fi

  local conf_content
  conf_content="server {
    listen 80;
    listen [::]:80;
    server_name \${DOMAIN};
    return 301 https://\\\$host\\\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name \${DOMAIN};

    ssl_certificate     \${REMOTE_CERT};
    ssl_certificate_key \${REMOTE_KEY};
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root \${REMOTE_WEB_ROOT};
    index index.html index_cn.html;

    location / {
        try_files \\\$uri \\\$uri/ =404;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        expires 7d;
        add_header Cache-Control \"public, immutable\";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}"

  mkdir -p "\${REMOTE_WEB_ROOT}"

  if [ -d /etc/nginx/sites-available ]; then
    # Debian / Ubuntu
    echo "\${conf_content}" > "/etc/nginx/sites-available/\${NGINX_SITE_NAME}"
    ln -sf "/etc/nginx/sites-available/\${NGINX_SITE_NAME}" "/etc/nginx/sites-enabled/\${NGINX_SITE_NAME}"
    rm -f /etc/nginx/sites-enabled/default
  else
    # CentOS / RHEL 等
    echo "\${conf_content}" > "/etc/nginx/conf.d/\${NGINX_SITE_NAME}.conf"
  fi

  echo "[远程] Nginx HTTPS 站点配置已写入"
}

start_nginx() {
  if nginx -t 2>/dev/null; then
    echo "[远程] Nginx 配置语法检查通过"
  else
    nginx -t
    exit 1
  fi

  if command -v systemctl &>/dev/null; then
    systemctl enable nginx
    systemctl restart nginx
    echo "[远程] Nginx 已启动并设为开机自启"
  else
    service nginx restart
    echo "[远程] Nginx 已重启"
  fi
}

install_nginx
open_firewall
write_nginx_config
start_nginx
REMOTE_SCRIPT
}

# ---------- 主流程 ----------
main() {
  echo "========================================"
  echo "  静态网站部署 -> ${SSH_USER}@${SSH_HOST}"
  echo "========================================"

  if [[ "${SSH_HOST}" == "your-server-ip-or-domain" ]] || [[ "${SSH_PASSWORD}" == "your-password" ]]; then
    echo "错误: 请先在 deploy.sh 顶部填写 SSH_HOST、SSH_USER、SSH_PASSWORD"
    exit 1
  fi

  check_local_deps
  check_ssl_files

  echo ""
  echo "[1/4] 测试 SSH 连接..."
  ssh_run "echo 'SSH 连接成功'" >/dev/null
  echo "      SSH 连接正常"

  echo ""
  echo "[2/4] 上传 SSL 证书..."
  upload_ssl_certs
  echo "      证书已上传到 ${REMOTE_SSL_DIR}"

  echo ""
  echo "[3/4] 安装/检查 Nginx 并配置 HTTPS..."
  remote_setup

  echo ""
  echo "[4/4] 上传网站文件..."
  ssh_run "mkdir -p '${REMOTE_WEB_ROOT}'"
  rsync_upload_site
  echo "      文件上传完成"

  echo ""
  echo "========================================"
  echo "  部署成功！"
  echo "  访问地址: https://jhd-ceramics.com"
  echo "            https://www.jhd-ceramics.com"
  echo "  HTTP 会自动跳转到 HTTPS"
  echo "  网站目录: ${REMOTE_WEB_ROOT}"
  echo "  证书目录: ${REMOTE_SSL_DIR}"
  echo "========================================"
}

main "$@"
