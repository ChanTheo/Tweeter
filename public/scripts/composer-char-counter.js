// ensures the DOM has loaded: runs a call back when the dom is ready to be manipulated by jQuery
$(document).ready(function() {
  // --- our code goes here ---

  $("textarea").on("input", function() {
    let char = $(this).val();
    let numChar = 140 - char.length;
    
    
    if (numChar < 0) {
      $(".counter").css({"color": "red"});
    }
    $(".counter").text(numChar);
  });

});

