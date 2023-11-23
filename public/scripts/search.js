$(document).ready(function () {
  function searchResources(keyword) {
    $.ajax({
      method: 'GET',
      url: `/search?query=${encodeURIComponent(keyword)}`,
      dataType: 'json',
      success: function (results) {
        // Display the search results
        displaySearchResults(results);
        // Check if no search results were found
        if (results.length === 0) {
          $(".error-message").text("No resources found for the entered keyword").slideDown();
        } else {
          // Hide any previous error messages if results are found
          $(".error-message").slideUp();
        }
      },
      error: function (error) {
        console.error('Error fetching search results:', error);
      }
    });
  }

  function createResourceElement(result) {
    console.log(result);
    return $(`
      <article class="resource-container">
        <div class="resource-content">
          <img src="${result.images_url}" alt="resource-photo" class="resource-img">
          <span class="resource-like">❤️</span>
        </div>
        <div class="resource-info">
          <p class="resource-title">${result.title}</p>
        </div>
        <div class="resource-links">
          <a href="${result.url}" class="resource-visit-btn"><span>🔗</span> Visit</a>
          <a href="" class="resource-more-btn"><span>➕</span> More</a>
        </div>
      </article>
    `);
  }



  function displaySearchResults(results) {
    const searchResultsContainer = $('#searchResults');
    const existingResourceSection = $('#existingResourceSection');

    // Hide existing resource section
    existingResourceSection.hide();

    // Clear and show the search results container
    searchResultsContainer.empty().show();

    results.forEach(result => {
      const article = createResourceElement(result);
      searchResultsContainer.append(article);
    });
  }

  $('.navbar-more').on('click', function () {
    const keyword = $(this).closest('.navbar').find('.navbar-search').val();
    searchResources(keyword);
  });

  $('.navbar-search').on('keypress', function (event) {
    if (event.key === 'Enter') {
      const keyword = $(this).val();
      searchResources(keyword);
    }
  });
});




