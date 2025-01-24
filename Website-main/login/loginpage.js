$(document).ready(function () {
    // Smooth page transition
    $('body').css('display', 'none');
    $('body').fadeIn(500);

    $('a').click(function (event) {
        event.preventDefault();
        newLocation = this.href;
        $('body').fadeOut(1000, newpage);
    });

    function newpage() {
        window.location = newLocation;
    }

    // Add loaded class to body when page loads
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // Add validation for email field
    $('#email').on('input', function () {
        const email = $(this).val();
        const emailErrorMessage = $('#emailErrorMessage');

        if (email && !email.includes('@')) {
            emailErrorMessage.text('Please enter a valid email address with @ sign');
            $(this).addClass('error');
        } else {
            emailErrorMessage.text('');
            $(this).removeClass('error');
        }
    });

    // Update the form submit handler
    $('#loginForm').on('submit', function (event) {
        event.preventDefault();
        const emailErrorMessage = $('#emailErrorMessage');
        const passwordErrorMessage = $('#passwordErrorMessage');
        const generalErrorMessage = $('#generalErrorMessage');
        emailErrorMessage.text('');
        passwordErrorMessage.text('');
        generalErrorMessage.text('');

        const email = $('#email').val();
        const password = $('#password').val();

        // Check if fields are left blank
        if (!email) {
            emailErrorMessage.text('Email is required.');
            return;
        }
        // Check for @ in email
        if (!email.includes('@')) {
            emailErrorMessage.text('Please enter a valid email address with @ sign');
            return;
        }
        if (!password) {
            passwordErrorMessage.text('Password is required.');
            return;
        }

        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function (result) {
                if (!result.success) {
                    if (result.errorField === 'email') {
                        emailErrorMessage.text('Invalid email address.');
                    } else if (result.errorField === 'password') {
                        passwordErrorMessage.text('Incorrect password.');
                    } else {
                        generalErrorMessage.text('Email or password is incorrect.');
                    }
                } else {
                    window.location.href = '../firstpage/firstPage.html';
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', xhr.responseText);
                generalErrorMessage.text('Username or password is incorrect. Please try again.');
            }
        });
    });

    const $body = $('body');
    const $overlay = $('.page-transition-overlay');

    function handlePageTransition(url) {
        $overlay.addClass('active');
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    $(document).on('click', 'a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target])', function (e) {
        e.preventDefault();
        const newUrl = $(this).attr('href');
        handlePageTransition(newUrl);
    });

    $(window).on('popstate', function () {
        handlePageTransition(window.location.href);
    });

    $(window).on('load', function () {
        $overlay.removeClass('active');
        $body.addClass('loaded');
    });

    if (document.readyState === 'complete') {
        $body.addClass('loaded');
    }
});