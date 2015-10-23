$(document).ready(function () {
    $(document).mousemove(function (e) {
        TweenLite.to($('body'),
           .5,
           {
               css:
                 {
                     backgroundPosition: "" + parseInt(event.pageX / 8) + "px " + parseInt(event.pageY / '100000') + "px, " + parseInt(event.pageX / '15') + "px " + parseInt(event.pageY / '15') + "px, " + parseInt(event.pageX / '30') + "px " + parseInt(event.pageY / '30') + "px"
                 }
           });
    });
});