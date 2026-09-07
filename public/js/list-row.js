/**
 * 产品列表同行高度对齐（从原 jquery.global.js 提取）
 */
(function ($) {
    $.fn.extend({
        listRow: function (options) {
            var $root = $(this);
            var $items = $root.find(options.rowList);
            var cols = Math.ceil($items.length / options.row);
            for (var i = 0; i < cols; i++) {
                var min = i * options.row;
                var max = (i + 1) * options.row;
                var height = 0;
                for (var j = min; j < max; j++) {
                    var h = $items.eq(j).find(options.rowFind).height();
                    if (h > height) {
                        height = h;
                    }
                }
                for (var k = min; k < max; k++) {
                    $items.eq(k).find(options.rowFind).height(height);
                }
            }
            return this;
        }
    });
})(jQuery);
