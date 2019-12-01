import { readSync } from "fs";

;
(function() {
    'use strict' 
    function moreLess(initiallyVisibleCharacters) {
        var visibleCharacters = initiallyVisibleCharacters;
        var paragraph = $(".post-summary")
        paragraph.each(function() {
            var text = $(this).text();
            var wholeText = text.slice(0, visibleCharacters) + "<span class='ellipsis'>... </span>"
            if (text.length < visibleCharacters) {
                return
            } else {
                $(this).html(wholeText)
            }   
        });
    };
    function submenu() {
        $('.dropdown-submenu a.test').on("click", function (e) {
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
        });
    }
   
    // DOM Ready 
    $(function() {
        moreLess(125);
        submenu();
    });
})();