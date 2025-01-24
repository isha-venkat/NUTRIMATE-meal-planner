$(document).ready(function () {
    // Fade in animation for container
    $('.login-container').animate({
        opacity: 1,
        transform: 'translateY(0)'
    }, 800);

    // Animate brand name
    setTimeout(function () {
        $('.brand-name').animate({
            opacity: 1
        }, 600).css('transform', 'translateY(0)');
    }, 400);

    // Animate buttons sequentially
    setTimeout(function () {
        $('.login-button').animate({
            opacity: 1
        }, 600).css('transform', 'translateX(0)');
    }, 800);

    setTimeout(function () {
        $('.signup-button').animate({
            opacity: 1
        }, 600).css('transform', 'translateX(0)');
    }, 1000);

    // Add ripple effect to buttons
    $('.button').on('click', function (e) {
        let x = e.pageX - $(this).offset().left;
        let y = e.pageY - $(this).offset().top;

        let ripple = $('<span class="ripple"></span>');
        ripple.css({
            left: x + 'px',
            top: y + 'px'
        });

        $(this).append(ripple);

        setTimeout(function () {
            ripple.remove();
        }, 600);
    });

    // Hover effects with jQuery
    $('.button').hover(
        function () {
            $(this).stop().animate({
                opacity: 0.9
            }, 200);
        },
        function () {
            $(this).stop().animate({
                opacity: 1
            }, 200);
        }
    );
});