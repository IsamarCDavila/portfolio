$.fn.resizeText = function () {
    var width = $(this).innerWidth();
    var height = $(this).innerHeight();
    var html =  $(this).html();
    var newElem = $("<div>", {
        html: html,
        style: "display: inline-block;overflow:hidden;font-size:0.1em;padding:0;margin:0;border:0;outline:0"
    });

    newElem.addClass('resizeTextC');

    if (!$(this).find('.resizeTextC').length) {
        $(this).html(newElem);
    } else {
        newElem = $(this).find('.resizeTextC');
        newElem.css('font-size','0.1em');
    }
    
    $.resizeText.increaseSize(0.5, 0.1, newElem, width, height);

    /*$(window).resize(function () {
        if ($.resizeText.interval)
            clearTimeout($.resizeText.interval)

        $.resizeText.interval = setTimeout(function () {
            elem.html(elem.find("div.createdResizeObject").first().html());
            elem.resizeText();
        }, 300);
    });*/
}

$.resizeText = {
    increaseSize: function (start, increment, newElem, width, height) {
        var fontSize = start;
        var tries = 1000;
        var mTry = 0;

        while (newElem.outerWidth() <= width) {
            fontSize += increment;
            newElem.css("font-size", fontSize + "em");

            if (mTry++ >= tries) {
                console.error('resizeText: max tries excided');
                break;
            }
        }

        if (newElem.outerWidth() > width) {
            fontSize -= increment;
            newElem.css("font-size", fontSize + "em");
            if (increment > 0.1) {
                $.resizeText.increaseSize(increment / 10, fontSize, newElem, width, height);
            }
        }
    }
};