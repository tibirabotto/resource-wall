
$(document).ready(function(){
  //Like button
  $(".resource-like").click(function(){
    let resource_id = $(this).attr('id');
    console.log(`REsource_id: ${resource_id}`);
    let bool = false;
    if ($(this).attr("src") === "images/heart.png") {
      bool = true;
    }
    $.ajax({
      method: "GET",
      url: "/api/users/username",
      dataType: 'json',
      cache: false
    })
    .then(function(data) {
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
      .then(function(data){
        if (bool) {
          $(`#${resource_id}`).attr("src", "images/redHeart.png");
        } else {
          $(`#${resource_id}`).attr("src", "images/heart.png");
        }
      })
      .catch(err => console.log(`Error liking the article!`))
    })
    .catch(err => console.log(`Error getting username`))
  });
});
