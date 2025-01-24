window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});
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

    // Real-time validation
    $('form input').on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-message').text('');
    });

    // Set max date to yesterday
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const maxDate = yesterday.toISOString().split('T')[0];

    // Set max attribute on birthdate input
    $('#birthdate').attr('max', maxDate);

    // Add validation for birthdate field
    $('#birthdate').on('input change', function () {
        const selectedDate = new Date($(this).val());
        const errorMessage = $(this).next('.error-message');

        if (selectedDate >= today) {
            errorMessage.text('Birthdate cannot be today or a future date');
            $(this).addClass('error');
        } else {
            errorMessage.text('');
            $(this).removeClass('error');
        }
    });

    // Update the form submit handler to include birthdate validation
    $('form').on('submit', function (event) {
        event.preventDefault();
        const form = $(this);
        const submitButton = form.find('button[type="submit"]');
        const loading = form.find('.loading');

        // Clear previous error messages
        form.find('.error-message').text('');

        // Validate form fields
        let isValid = true;
        const formData = form.serializeArray();

        formData.forEach(function (field) {
            const input = form.find(`[name="${field.name}"]`);
            if (!field.value || (field.name === 'goal' && field.value === 'Goal')) {
                const errorMessage = field.name === 'goal' ? 'Please select a goal' : 'This field is required';
                form.find(`#${field.name}`).next('.error-message').text(errorMessage);
                input.addClass('error');
                isValid = false;
            }
        });

        // Additional birthdate validation
        const birthdateInput = $('#birthdate');
        const selectedDate = new Date(birthdateInput.val());

        if (selectedDate >= today) {
            birthdateInput.next('.error-message').text('Birthdate cannot be today or a future date');
            birthdateInput.addClass('error');
            return false;
        }

        if (!isValid) return;

        // Disable submit button and show loading
        submitButton.prop('disabled', true);
        loading.show();

        $.ajax({
            url: form.attr('action'),
            method: form.attr('method'),
            contentType: 'application/json',
            data: JSON.stringify(Object.fromEntries(formData.map(item => [item.name, item.value]))),
            success: function (result) {
                if (result.success) {
                    window.location.href = "signupSuccess.html";
                } else {
                    if (result.message === 'This email is already in use') {
                        form.find('#email').next('.error-message').text('This email is already in use. Please choose another one.');
                    } else {
                        form.find('.general-error-message').text(result.message);
                    }
                }
            },
            error: function () {
                form.find('.general-error-message').text('An error occurred. Please try again.');
            },
            complete: function () {
                submitButton.prop('disabled', false);
                loading.hide();
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