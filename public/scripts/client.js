/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // error message is hidden on page load
  $("#error-message").addClass('hide');
  

  // hide new tweet section on load
  $(".new-tweet").hide();

  // jQuery slide down function
  $("#nav-bar__tweet-button").click(function() {
    $(".new-tweet").slideToggle(400);
    // user can begin typing in the text area after clicking the nav bar button
    $(".new-tweet__text-area").focus();
  });

  

  // escape function:

  const escape =  function(string) {
    // creates a new div
    let div = document.createElement('div');

    // creates text node and appends it as the last child of the newly created div node
    div.appendChild(document.createTextNode(string));

    return div.innerHTML;
  };

  const createTweetElement = function(obj) {
    
    // let time = moment().startOf('hour').fromNow();
    obj.created_at = moment().fromNow()
    
    let $tweet = `
<article class="tweet">
<header>
<span class="tweet-header">
<div class="avatar">
<img src= ${obj.user.avatars}>
</div>
<div class="tweet__username">
 ${obj.user.name}
</div>
<div class="handle">
${obj.user.handle}
</div>
</header>
<div>
<p> ${escape(obj.content.text)} <p>
<hr>
</div>
<footer>
<span>
 ${obj.created_at}
</span>
<div>
<span class="icon">
<i class="fas fa-flag"></i>
</span>
<span class="icon">
<i class="fas fa-retweet"></i>
</span>
<span class="icon">
<i class="fas fa-heart"></i>
</span>
</div>
</footer>
</article>
`;
    return $tweet;
  };

  // const timeToDate = function() {
  //   const randomCondition = (Math.random * 1) > 1.5
  // const time = (Math.random() * 24).toFixed(0);
  //   return randomCondition ? time + " hours ago": time + " days ago"

  // };


  

  // renderTweets function
  // loops through an array of object tweets and calls createTweetElement on everyone

  const renderTweets = function(objArr) {
    let callbackResult;
    for (const tweetObject of objArr) {
      callbackResult = createTweetElement(tweetObject);
      $('#tweets-container').prepend(callbackResult);
      callbackResult = null;
    }

  };


  // create an Ajax post request
  // listening for a submit event on our new tweet form
  $(".new-tweet__form").submit(function(event) {
    event.preventDefault();
    let $counter = $(".counter");

    let $form = $(this).serialize();
    let $error = $("#error-message");
    // disallow form submission if the tweet is empty or exceeds 140 chars
    if ($form === "text=") {
  
      $error.removeClass('hide');
      $error.text("Uh Oh! Looks like the tweet you submitted is empty!");
      $counter.text("140");
    } else if ($form.length > 140) {
  
      $error.removeClass('hide');
      $error.text("Uh Oh! Looks like the tweet you submitted exceeded the maximum length of 140 characters");
    } else {
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets/",
        data: $form
      }).then(() => $(".new-tweet__form").each(function() {
        this.reset();
        $error.addClass('hide');
        $counter.text("140");
      }))
        .then((data) => loadTweets(data));
    }
  });


  // Inside your client.js file and within the document ready function, define a function called loadTweets
  // that is responsible for fetching tweets from the http://localhost:8080/tweets page.

  const loadTweets = function() {

    $.ajax({
      method : "GET",
      url: "http://localhost:8080/tweets/",

    }).then((data) => renderTweets(data));
  };

  loadTweets();


});


