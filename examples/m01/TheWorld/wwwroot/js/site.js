// site.js
(function () {

    //var username = $("#username");
    //username.text("Keyvan Hadjari");
    
    //var main = $("#main");
    //main.on("mouseenter", function () {
    //    main.css("background-color", "#888");
    //});

    //main.on("mouseleave", function () {
    //    main.css("background-color", "");
    //});

    //$("ul.menu li a").on("click", function () {
    //    alert($(this).text());
    //});

    var $sidebarAndWrapper = $("#sidebar,#wrapper");
    var $icon = $("#sidebarToggle i.fa");

    $("#sidebarToggle").on("click", function() {
        $sidebarAndWrapper.toggleClass("hide-sidebar");
        if ($sidebarAndWrapper.hasClass("hide-sidebar")) {
            //$("#sidebarToggle").text("Show Sidebar");
            $icon.removeClass("fa-angle-left");
            $icon.addClass("fa-angle-right");
        } 
        else {
            //$("#sidebarToggle").text("Hide Sidebar");
            $icon.addClass("fa-angle-left");
            $icon.removeClass("fa-angle-right");
        }
    });

})();