const handleSubmit = () => {
  $("#form_comment").on("submit", function(e) {
    e.preventDefault();

    $.post({
      url: "http://localhost:8080/resource/comment",
      data: $(this).serialize(),
    })
      .done(function(data) {
        console.log(data.resource[0]);
        let $commet = createCommentElement(data.resource[0]);
        $('.details-comment-box').val('');
        $(".user-comment").prepend($commet);
      })
      .fail(function (error) {
        console.log(`ERROR: ${error}`);
      });
  });
};

const createCommentElement = (comment) => {
  return `<p class="user-detail-comment"><i>${comment.description}</i></p>
                <div class="user-comment-info">
                  <p>${comment.username}</p>
                  <p>time</p>
                </div>`;
};

$(document).ready(function () {
  handleSubmit();


});
