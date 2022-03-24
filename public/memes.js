$(document).ready(function (){
    $(function () {
        $('.slick-prev').text('<');
        $('.slick-next').text('>');
    });

    $('.content__memes').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        speed: 1200,
        lazyLoad: true,
        dots: true
    });
});


//console.log($('.slick-prev').text())