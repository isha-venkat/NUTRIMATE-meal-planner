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

    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        const recipeName = $('.search-bar').val().trim();

        $.ajax({
            url: 'http://localhost:3000/searchByRecipeName',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ recipeName: recipeName }),
            success: function (data) {

                const resultsContainer = $('#resultsContainer');
                $('#backButton').show();

                // Clear previous results
                resultsContainer.empty();
                $('#noResults').hide();

                if (data.success && data.recipes && data.recipes.length > 0) {
                    data.recipes.forEach(recipe => {
                        const imageName = recipe.RecipeName.replace(/\s+/g, '_').replace(/&/g, 'and') + '.png';
                        const imagePath = `../images/${imageName}`;
                        const card = $(`
                            <div class="horizontal-recipe-card">
                                <img src="${imagePath}" alt="${recipe.RecipeName}">
                                <div class="horizontal-recipe-card-content">
                                    <h3>${recipe.RecipeName}</h3>
                                    <p>Ingredients: ${recipe.Ingredients}</p>
                                    <p>Proteins: ${recipe.Proteins ? recipe.Proteins + ' g' : 'Not Available'}</p>
                                    <p>Carbs: ${recipe.Carbs ? recipe.Carbs + ' g' : 'Not Available'}</p>
                                    <p>Fat: ${recipe.Fat ? recipe.Fat + ' g' : 'Not Available'}</p>
                                    <p>Total Calories: ${recipe.TotalCalories ? recipe.TotalCalories : 'Not Available'}</p>
                                    <p>Instructions: ${recipe.Instructions}</p>
                                </div>
                            </div>
                        `);

                        resultsContainer.append(card);
                    });
                } else {
                    $('#noResults').show();
                }
            },
            error: function (error) {
                console.error('Error fetching data:', error);
                $('#noResults').show();
            }
        });
    });

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

    $('#backButton').on('click', function () {
        window.location.href = 'thirdpage.html';
    });

    // Fetch suggested recipes on page load
    fetchSuggestedRecipes();

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

$(document).ready(function () {
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
});