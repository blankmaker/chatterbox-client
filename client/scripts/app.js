// YOUR CODE HERE:

var app = {
  init: function() {}
};

var getMessages = function() {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    // data: JSON.stringify(message),
    contentType: 'application/json',
    // Why can't we just do 'success: displayMessages'?
    success: function(data) { displayMessages(data);},
    // function (data) {console.log('chatterbox: Message received');},
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Message not received');
    }
  });
};

var displayMessages = function(data) {
  var $messages = $('.messages');
  $messages.html('');
  for (var i = 0; i < data.results.length; i++) {
    var username = data.results[i].username;
    var text = data.results[i].text;
    console.log('typeof username:', typeof username);
    console.log('typeof text:', typeof text);
    // if the string doesn't contain illegal characters { append to body }
    if (username !== undefined && text !== undefined && username.indexOf('<') === -1 && text.indexOf('<') === -1) {
      $messages.append('<p>' + username + ': ' + text + '</p>');
    }
  }
};

//<p><script>alert('hi')</script></p>
getMessages();
setInterval(getMessages, 2000);

// var obj = $.ajax({
//   // always use this url
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'GET',
//   // data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message received');
//   },
//   error: function (data) {
//     // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Message not received');
//   }
// });

// obj.responseJSON.results <-- an array of objects
// obj.responseJSON.results[i].text
// var obj = obj.responseJSON.results[i]; // for looping, use i
// obj.text;

// createdAt: "2013-10-07T23:25:18.729Z"
// objectId: "CrVkLDG4DK"
// roomname: "room1"
// text: ""
// updatedAt: "2013-10-07T23:25:18.729Z"
// username: "PeterandGeorge"
