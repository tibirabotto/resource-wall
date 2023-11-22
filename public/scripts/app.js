// Client facing scripts here
$(document).ready(function(){
  let imageFlag = 0;

  //my-resource page
  $(".resource-like").click(function(){
    if(imageFlag === 0) {
      $(this).attr("src", "images/redHeart.png");
      imageFlag = 1;
    } else {
      $(this).attr("src", "images/heart.png");
      imageFlag = 0;
    }
  });
});
