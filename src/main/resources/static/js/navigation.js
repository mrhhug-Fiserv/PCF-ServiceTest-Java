$('.nav-btn').click(function() {
    var id=$(this).attr('id');
    var st=$('#'+id+'-card').offset().top - 70;
    console.log(st);
    if(st!==0) {
        $('main').animate({
            scrollTop: st
        }, 1000);
    }
});

setInterval(function() {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    $('.card').each(function() {
        var id=$(this).attr('id');
        var btnId='#'+ id.replace(/-card/, '');
        if($(this).offset().top > docViewTop && ($(this).offset().top < docViewBottom || ($(this).offset().top+$(this).height()) < docViewBottom)) {
            $(btnId).addClass('active');
        } else {
            $(btnId).removeClass('active');
        }
    });
}, 500);