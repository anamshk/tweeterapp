// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
const createTweetElement = (data) => {
  const $markup = $(`<article class="tweet">
  <div class='header'>
    <div class="left-header">
      <span class="userprof"><img style="width: 50%" src ="${data.user.avatars}"/></span>
      <span class="username">${data.user.name}</span>
    </div>
    <p class="userhandle"><strong>${data.user.handle}</strong></p>
  </div>
  <form> 
    <label id="body"><strong>${escape(data.content.text)}</strong></label> 
  </form>
  <footer class="bottom-bar">
    <div id='date'>
      <p class='tweet-time'><strong>${timeago.format(data.created_at)}</strong></p>
    </div>
    <p class='icons' class=overlimit>
      <i class="fab fa-font-awesome-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </p>
  </footer>
  </article>`);
  return $markup;
};

//function to help prevent XSS with Escaping and keep the content safe
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = function() {
  let url = 'http://localhost:8080/tweets';
  $.ajax({
    url: url,
    method: "GET"
  })
    .then((result)=>{
      // console.log('result:',result);
      renderTweets(result);
    });
  return $('.tweetfeed').empty();
};

const renderTweets = function(data) {
  // $('.tweetfeed').empty();
  data.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.tweetfeed').prepend($tweet);
  });
};
  
//POST req with AJAX
$(document).ready(() => {
  //if statements to validate form before posting
  const $form = $('.form');
  $($form).submit(function(event) {
    event.preventDefault();
    //giving the appropriate error message with slidedown
    if ($(".counter").val() < 0) {
      $(".alert").text('Your tweet has exceeded the maximum length.').show();
    } else if ($(".counter").val() > 139) {
      $(".alert").text('Your tweet has no text.').show();
    } else {
      $(".alert").hide();
      let url = 'http://localhost:8080/tweets';
      let data = $(this).serialize();
      $.ajax({
        url: url,
        method: "POST",
        data: data
      })
        .then(()=>{
          loadTweets();
        });
    }
// help to clear text from the textarea once you click tweet
$("textarea").val('');
$("output").val(140);
  });
});

