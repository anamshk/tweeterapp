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
    <p class="userhandle">${data.user.handle}</p>
  </div>
  <form> 
    <label id="body"><strong>${escape(data.content.text)}</strong></label> 
  </form>
  <footer class="bottom-bar">
    <div id='date'>
      <p class='tweet-time'>${timeago.format(data.created_at)}</p>
    </div>
    <p class='icons'>
      <i class="fab fa-font-awesome-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </p>
  </footer>
  </article>`);
  return $markup;
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = function () {
  let url = 'http://localhost:8080/tweets';
  $.ajax({
    url: url,
    method: "GET",
    // data: $(this).serialize()
  })
    .then((result)=>{
      // console.log('result:',result);
      renderTweets(result);
    });
  return;
};

const renderTweets = function(data) {
  $('.tweetfeed').empty();
  data.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.tweetfeed').prepend($tweet);
  });
};
  
//POST req with AJAX
$(document).ready(() => {
  // loadTweets();
  //if statements to validate form before posting
  const $form = $('.form');
  $($form).submit(function(event) {
    event.preventDefault();
    if ($(".counter").val() < 0) {
      $(".alert").text('Your tweet has excedeed the maximum length.').show();
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
  });
});

