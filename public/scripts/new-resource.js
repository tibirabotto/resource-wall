$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();

    const formData = $('form').serialize();

    $.ajax({
      method: "POST",
      url: "/resource/new",
      data: formData
    })
    .then(() => {
      console.log('Success!');
    })
    .catch((err) => console.log(`Error message: ${err.message}`))
  });
});
