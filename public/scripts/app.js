
$(document).ready(function(){
  //Like button
  $(".resource-like").click(function(){
    let resource_id = $(this).attr('id');
    let bool = false;
    if ($(this).attr("src") === "images/heart.png") {
      bool = true;
    }
    $.ajax({
      method: "GET",
      url: "/api/users/username",
      dataType: 'json',
    })
    .then(data => {
      let user_id = data.users.id;
      $.ajax({
        method: "GET",
        url: "/api/liked",
        dataType: 'json',
        data: {
          bool: bool,
          user_id: user_id,
          resource_id: resource_id
        }
      })
      // .then(data => console.log(`JSON data: line 32: ${JSON.stringify(data)}`))
      .then((data) => {
        console.log(`Inside app line 29: ${JSON.stringify(data)}`);
        if (bool) {
          $(this).attr("src", "images/redHeart.png");
        } else {
          $(this).attr("src", "images/redHeart.png");
        }
      })
      .catch(err => console.log(`Error liking the article!`))
    })
    .catch(err => console.log(`Error getting username`))
  });
});
