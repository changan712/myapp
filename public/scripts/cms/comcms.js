var $ = jQuery;
var toptip = $('#toptips');

if (toptip.length && toptip.is(':visible')) {
    toptip.delay(5000).animate({height: 0, opacity: 0}, 'fast', function () {
        $(this).hide().trigger('hide');
    });
}

var ifr = $('#ifr');

$('#left-nav').delegate('a', 'click', function () {
    var link = '/cms/ifr/' + $(this).attr('href').substring(1);
    ifr.attr('src', link);
});