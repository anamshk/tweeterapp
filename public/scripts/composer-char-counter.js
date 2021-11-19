$(document).ready(function() {
  let counter = document.getElementById("counter2");
  counter.innerHTML = 140;
  $('#tweet-text').keyup(function() {
    const charLength = $(this).val(); //the number of characters typed in textarea
    const result = 140 - charLength.length; // the remaining characters remaining from max length 140.
    if (result >= 0) {
      console.log("You have", result, "characters remaining.");
      counter.innerHTML = result;
      counter.classList.remove("overLimit");
    } else {
      console.log("You are", result, "characters over.");
      counter.innerHTML = result;
      counter.classList.add("overLimit");
    }
  });
});










// $('#tweet-text').on('input', ':text', function(){ console.log("typein"); });

// const $text = $("#tweet-text");
// const $newTweet = $(".new-text");

// $($text).on("input", function() {
//   let maxlength = $(this).attr(140);
//   let currentLength = $($newTweet).val().length;

//   if (currentLength > maxlength) {
//     console.log("You have reached the maximum number of characters.");
//   } else {
//     console.log(maxlength - currentLength + " chars left");
//   }
// });
