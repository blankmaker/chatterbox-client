// YOUR CODE HERE:

var app = {
  init: function() {}
};

$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  // data: JSON.stringify(message),
  contentType: 'application/json',
  success: function(data) { displayMessages(data);},
  // function (data) {console.log('chatterbox: Message received');},
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Message not received');
  }
});

// Function to display messages; takes an array of objects as argument
var displayMessages = function(data) {
  for (var i = 0; i < data.results.length; i++) {
    var username = data.results[i].username;
    var text = data.results[i].text;
    $('.messages').append('<p>' +username+ ': ' + text + '</p>');
  }
};

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
