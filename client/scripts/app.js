// YOUR CODE HERE:

  var app = {
    server: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    rooms: null,
    // Is anonymous function necessary?
    init: function() { app.fetch(); },
    fetch: function() {
      $.ajax({
        // always use this url
        // Look up ?order=-createdAt
        url: app.server,
        type: 'GET',
        // data: JSON.stringify(message),
        contentType: 'application/json',
        // Why can't we just do 'success: displayMessages'?
        success: function(data) { app.displayMessages(data); app.rooms = app.getRooms(data); },
        // function (data) {console.log('chatterbox: Message received');},
        error: function (data) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Message not received');
        }
      });
    },
    displayMessages: function(data) {
      var $messages = $('.messages');
      $messages.html('');
      // loop and display recent messages first
      for (var i = 0; i  < data.results.length; i++) {
        var username = data.results[i].username;
        var text = data.results[i].text;
        // if the string doesn't contain illegal characters { append to body }
        if (username !== undefined && text !== undefined && username.indexOf('<') === -1 && text.indexOf('<') === -1) {
          $messages.append('<p><b>' + username + '</b>: ' + text + '</p>');
        }
      }
    },
    send: function(message) {
      $.ajax({
        // always use this url
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    getRooms: function(data) {
      var rooms = {};
      for (var i = 0; i < data.results.length; i++) {
        rooms[data.results[i].roomname] = true;
      }
      return rooms;
    }
  };

  // When send button is clicked, create new object with username, text, and roomname

$(document).ready(function() {

  $('button').on('click', function() {
    var newChat = {
      'username': window.location.search.replace('?username=', ''),
      'text': $('.chatbox').val(),
      'roomname': '4chan'
    };
    app.send(newChat);
    $('.chatbox').val('');
  });

  //<p><script>alert('hi')</script></p>
  app.init();
  setInterval(app.fetch, 2000);

  // Hacks:
  // <
  // $(".main").css("background-color", "green")

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
});
