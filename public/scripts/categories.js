$(document).ready(function () {
  console.log('here');

    const categoryLinks = document.querySelectorAll('.navbar-categories a');
    console.log(categoryLinks);

    categoryLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        const category = this.getAttribute('data-category');

        fetch(`/api/resources?category=${category}`)
          .then(response => response.json())
          .then(resources => {
            console.log(resources);
            updateSearchResults(resources);
          })
          .catch(error => console.error('Error fetching resources:', error));
      });
    });

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


    function updateSearchResults(resources) {
      const existingResourceSection = $('#existingResourceSection');

      existingResourceSection.empty();

      for (const resource of resources) {
        const resourceElement = createResourceElement(resource);
        existingResourceSection.append(resourceElement);
      }


    }




});
