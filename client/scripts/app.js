// YOUR CODE HERE:

  var app = {
    server: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    rooms: 'lobby',
    currentRoom: undefined,
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
        success: function(data) {
          app.rooms = app.getRooms(data); // returns room object
          //fix so that rooms populate as needed
          $('select.rooms').html('');
          for (var room in app.rooms) {
            $('select.rooms').append('<option>'+ room + '</option>');
          }
          app.displayMessages(data);
        },
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
        var roomname = data.results[i].roomname;
        $('.changeRoom').on('click', function() { app.currentRoom = $('.rooms :selected').text();});
        // if the string doesn't contain illegal characters { append to body }
        if (username !== undefined && text !== undefined && username.indexOf('<') === -1 && text.indexOf('<') === -1) {
          if (roomname === app.currentRoom){
            $messages.append('<p><b>' + roomname + '/' + username + '</b>: ' + text + '</p>');
          }
          if (app.currentRoom === undefined) {
            $messages.append('<p><b>' + roomname + '/'+ username + '</b>: ' + text + '</p>');
          }
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
 console.log('app.rooms:', app.rooms);

  // When send button is clicked, create new object with username, text, and roomname

$(document).ready(function() {

  app.init();
  setInterval(app.fetch, 1000);

  $('button.send').on('click', function() {
    var newChat = {
      'username': window.location.search.replace('?username=', ''),
      'text': $('.chatbox').val(),
      'roomname': app.currentRoom
    };
    app.send(newChat);
    $('.chatbox').val('');
  });


  //<p><script>alert('hi')</script></p>
});

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
