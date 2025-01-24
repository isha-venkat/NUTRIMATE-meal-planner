$(document).ready(function () {
    // Show loading overlay
    $('.loading-overlay').fadeIn(300);
    // Initially hide body and content
    $('body').css('opacity', '0');
    $('.content-container').css({
        'opacity': '0',
        'transform': 'translateY(20px)'
    });

    // Fade in body first
    setTimeout(function () {
        $('body').css({
            'opacity': '1',
            'transition': 'opacity 0.8s ease-in-out'
        });

        // Then fade in content with slight upward movement
        setTimeout(function () {
            $('.content-container').css({
                'opacity': '1',
                'transform': 'translateY(0)',
                'transition': 'all 0.8s ease-out'
            });
        }, 200);
    }, 100);

    // Smooth page transition for links
    $('a').on('click', function (e) {
        e.preventDefault();
        const newPage = $(this).attr('href');

        // Fade out content first
        $('.content-container').css({
            'opacity': '0',
            'transform': 'translateY(20px)',
            'transition': 'all 0.5s ease-in'
        });

        // Then fade out body
        setTimeout(function () {
            $('body').css({
                'opacity': '0',
                'transition': 'opacity 0.5s ease-in'
            });

            // Navigate to new page
            setTimeout(function () {
                window.location.href = newPage;
            }, 500);
        }, 300);
    });

    const $body = $('body');

    $(window).on('load', function () {
        $body.addClass('loaded');
    });

    if (document.readyState === 'complete') {
        $body.addClass('loaded');
    }

    $.ajax({
        url: 'http://localhost:3000/profile',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                // Populate personal info fields
                $('#name').val(data.name);
                $('#email').val(data.email);
                $('#birthdate').val(formatDate(data.birthdate));
                $('#height').val(data.height);
                $('#weight').val(data.weight);
                $('#goal').val(data.goal); // Populate goal field
            } else {
                console.error('Error fetching profile data:', data.message);
            }
        },
        error: function (error) {
            console.error('Error:', error);
        },
        complete: function () {
            // Hide loading overlay
            $('.loading-overlay').fadeOut(300);
        }
    });

    // Check for cookie consent
    if (getCookie('cookiesAccepted')) {
        console.log('Cookies are accepted.');
        // Add your tracking code here
    }

    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function updateProfile() {
    // Get form data
    const name = $('#name').val();
    const email = $('#email').val();
    const height = $('#height').val();
    const weight = $('#weight').val();
    const birthdate = $('#birthdate').val();
    const goal = $('#goal').val();

    // Split name into fname and lname
    const [fname, lname] = name.split(' ');

    // Create data object
    const data = {
        fname: fname,
        lname: lname,
        email: email,
        height: height,
        weight: weight,
        birthdate: birthdate,
        goal: goal
    };

    // Send data to the endpoint
    $.ajax({
        url: 'http://localhost:3000/updateProfile',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            console.log('Success:', data);
        },
        error: function (error) {
            console.error('Error:', error);

        }
    });
}

document.querySelector('#logout-button').addEventListener('click', function () {
    window.location.href = '../login/welcome.html';
});