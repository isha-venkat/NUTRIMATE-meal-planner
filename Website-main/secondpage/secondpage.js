$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        const ingredient = $('.search-bar').val().trim();

        $.ajax({
            url: 'http://localhost:3000/search',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ ingredient }),
            success: function (data) {

                const resultsContainer = $('#resultsContainer');
                $('#backButton').show();
                $('.square-box-container').hide();
                resultsContainer.empty();
                $('#noResults').hide();

                if (data.success && data.recipes && data.recipes.length > 0) {
                    data.recipes.forEach((recipe, index) => {

                        const imageName = recipe.RecipeName.replace(/\s+/g, '_').replace(/&/g, 'and') + '.png';
                        const imagePath = `../images/${imageName}`;
                        const card = $(`
                            <div class="recipe-card" data-recipe='${JSON.stringify(recipe)}'>
                                <img src="${imagePath}" alt="${recipe.RecipeName}">
                                <h3>${recipe.RecipeName}</h3>
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
    $('#resultsContainer').on('click', '.recipe-card', function () {
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

    // Close the popup
    $('#closePopup, #overlay').on('click', function () {
        $('#overlay').fadeOut(300);
        $('#popup').fadeOut(300);
    });

    $('#backButton').on('click', function () {
        window.location.href = 'secondPage.html';
    });

    $('#proteinButton').on('click', function () {
        window.location.href = 'protein.html';
    });

    $('#carbsButton').on('click', function () {
        window.location.href = 'carbs.html';
    });

    $('#fatsButton').on('click', function () {
        window.location.href = 'fats.html';
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

    // Initial load transitions
    setTimeout(() => {
        $('body').addClass('loaded');
        setTimeout(() => {
            $('.content-container').addClass('loaded');
            setTimeout(() => {
                $('.recipe-cards-container').addClass('loaded');
            }, 200);
        }, 200);
    }, 100);

    // Page exit transitions
    $('a').on('click', function (e) {
        e.preventDefault();
        const newPage = $(this).attr('href');

        $('.recipe-cards-container').removeClass('loaded');
        setTimeout(() => {
            $('.content-container').removeClass('loaded');
            setTimeout(() => {
                $('body').removeClass('loaded');
                setTimeout(() => {
                    window.location.href = newPage;
                }, 500);
            }, 200);
        }, 200);
    });

    // Show loading overlay during AJAX requests
    $(document).ajaxStart(function () {
        $('.loading-overlay').fadeIn(300);
    }).ajaxStop(function () {
        $('.loading-overlay').fadeOut(300);
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