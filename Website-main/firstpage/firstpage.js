function fetchSuggestedRecipes() {
    // Show loading overlay
    $('.loading-overlay').fadeIn(300);

    $.ajax({
        url: 'http://localhost:3000/suggested-recipes',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                const container = $('#suggestedRecipesContainer');
                container.empty();

                data.recipes.forEach(recipe => {
                    const card = $(`
              <div class="recipe-card" data-recipe='${JSON.stringify(recipe)}'>
                <img src="../images/${recipe.RecipeName.replace(/\s+/g, '_').replace(/&/g, 'and')}.png" alt="${recipe.RecipeName}">
                <h3>${recipe.RecipeName}</h3>
                <p>Proteins: ${recipe.Proteins} g</p>
                <p>Carbs: ${recipe.Carbs} g</p>
                <p>Fat: ${recipe.Fat} g</p>
                <p>Total Calories: ${recipe.TotalCalories}</p>
              </div>
            `);
                    container.append(card);
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching suggested recipes:', error);
        },
        complete: function () {
            // Hide loading overlay
            $('.loading-overlay').fadeOut(300);
        }
    });
}

$(document).ready(function () {
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

    $('.hero-section').addClass('show');

    // Fetch suggested recipes on page load
    fetchSuggestedRecipes();

    // Use event delegation to bind click to the parent container
    $('#suggestedRecipesContainer').on('click', '.recipe-card', function () {
        const recipe = $(this).data('recipe');
        $('#popupTitle').text(recipe.RecipeName);
        $('#popupIngredients').text(`Ingredients: ${recipe.Ingredients}`);
        $('#popupProteins').text(`Proteins: ${recipe.Proteins ? recipe.Proteins + ' g' : 'Not Available'}`);
        $('#popupCarbs').text(`Carbs: ${recipe.Carbs ? recipe.Carbs + ' g' : 'Not Available'}`);
        $('#popupFat').text(`Fat: ${recipe.Fat ? recipe.Fat + ' g' : 'Not Available'}`);
        $('#popupTotalCalories').text(`Total Calories: ${recipe.TotalCalories ? recipe.TotalCalories : 'Not Available'}`);
        $('#popupInstructions').text(`Instructions: ${recipe.Instructions}`);
        // Show the pop-up modal and overlay
        $('#overlay').fadeIn(300);
        $('#popup').fadeIn(300);
    });

    $('#closePopup, #overlay').on('click', function () {
        $('#overlay').fadeOut(300);
        $('#popup').fadeOut(300);
    });

    // Add loaded class to body when page loads
    $('body').addClass('loaded');

    // Smooth page transition for all links
    $('a').on('click', function (e) {
        e.preventDefault();
        const newPage = $(this).attr('href');

        // Add transition overlay
        $('.page-transition-overlay').addClass('active');

        // Fade out body
        $('body').css('opacity', 0);

        // Navigate to new page after transition
        setTimeout(function () {
            window.location.href = newPage;
        }, 500);
    });

    // Button click transitions
    $('#proteinButton, #carbsButton, #fatsButton, #backButton').on('click', function (e) {
        e.preventDefault();
        const newPage = $(this).data('href') || $(this).attr('href');

        $('.page-transition-overlay').addClass('active');
        $('body').css('opacity', 0);

        setTimeout(function () {
            window.location.href = newPage;
        }, 500);
    });

    // Check for cookie consent
    if (getCookie('cookiesAccepted')) {
        console.log('Cookies are accepted.');
        // Add your tracking code here
    }

    // Cookie consent logic
    if (!getCookie('cookiesAccepted')) {
        $('#cookieConsent').show();
    }

    $('#acceptCookies').on('click', function () {
        setCookie('cookiesAccepted', 'true', 365);
        $('#cookieConsent').hide();
    });

    $('#declineCookies').on('click', function () {
        $('#cookieConsent').hide();
    });

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
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