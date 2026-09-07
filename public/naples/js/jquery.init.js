$(function () {
    function gMenuStylePage() {
        if (this.doMenuStyle === 1) {
            return;
        }
        this.doMenuStyle = 1;
        $("#g-web-ul-menu").menuStyle();
    }
    gMenuStylePage();
    $(window).resize(function () {
        this.doMenuStyle = 0;
        gMenuStylePage();
    });
});
