// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      const $usersList = $('#users');
      $usersList.empty();

      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});

// Replace the "☆" with "★" when hovering
const stars = document.querySelectorAll('.resource-ratings p');

stars.forEach(star => {
  star.addEventListener('mouseover', function() {
    this.innerText = '★';
  });

  star.addEventListener('mouseout', function() {
    this.innerText = '☆';
  });
});
