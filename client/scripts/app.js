// YOUR CODE HERE:

  var app = {
    server: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    rooms: {'(All Messages)': true},
    currentRoom: '(All Messages)',
    friends: {},
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
          _.defaults(app.rooms, app.getRooms(data)); // returns room object
          // fix so that rooms populate as needed
          // $('select#roomSelect').html('');
          app.displayMessages(data);
          for (var room in app.rooms) {
            if($('option').text().indexOf(room) === -1) {
              app.addRoom(room); // changes currentRoom
            }
          }
        },
        // function (data) {console.log('chatterbox: Message received');},
        error: function (data) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Message not received');
        }
      });
    },
    clearMessages: function() {
      $('#chats').html('');
    },
    addMessage: function(message) {
      $('button.changeRoom').on('click', function() { app.currentRoom = $('select#roomSelect :selected').text();});

      var roomname = message.roomname;
        // console.log('curRoom', app.currentRoom);
        if (message.roomname === app.currentRoom){
          var $messageContainer = $('<div class="messageContainer"></div>');
          var $username = $('<a href="#" class="username"></a>').text(message.username);
          var $text = $('<span></span>').text(message.text);
          var $roomname = $('<span></span>').text(message.roomname);

          $messageContainer.append($roomname);
          $messageContainer.append(' / ');
          $messageContainer.append($username);
          $messageContainer.append(': ');
          $messageContainer.append($text);
          $('#chats').append($messageContainer);
        }
        if(app.currentRoom === '(All Messages)') {
          var $messageContainer = $('<div class="messageContainer"></div>');
          var $username = $('<a href="#" class="username"></a>').text(message.username);
          var $text = $('<span></span>').text(message.text);
          var $roomname = $('<span></span>').text(message.roomname);

          $messageContainer.append($roomname);
          $messageContainer.append(' / ');
          $messageContainer.append($username);
          $messageContainer.append(': ');
          $messageContainer.append($text);
          $('#chats').append($messageContainer);
        }


      // if the string doesn't contain illegal characters { append to bod
      // escapedMessage = $('<p></p>').text(message.roomname + '/' + message.username + ': ' + message.text);
      // $('select#roomSelect').append(escapedRoom);

      // if (username !== undefined && text !== undefined && roomname !== undefined) {

      // var username = message.username.replace(/[&<>"'\/]/g, '');
      // var text = message.text.replace(/[&<>"'\/]/g, '');;
      },
      // console.log($(username).selector);
    displayMessages: function(data) {
      app.clearMessages();
      // loop and display recent messages first
      for (var i = 0; i < data.results.length; i++) {
        app.addMessage(data.results[i]);
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
    },
    addRoom: function(room) {
      // room = room.replace(/[&<>"'\/]/g, '');
      escapedRoom = $('<option></option>').text(room);
      $('select#roomSelect').append(escapedRoom);
    },
    handleSubmit: function() {
      var newChat = {
        'username': window.location.search.replace('?username=', ''),
        'text': $('#message').val(),
        'roomname': app.currentRoom === '(All Messages)' ? '' : app.currentRoom
      };
      app.send(newChat);
      $('#message').val('');
    },
    addFriend: function() {}
  };

  // When send button is clicked, create new object with username, text, and roomname

$(document).ready(function() {

  app.init();
  setInterval(app.fetch, 1000);

  $('#send').on('submit', function(event) {
    event.preventDefault();
    app.handleSubmit();
  });

  $('button.addRoom').on('click', function() {
    app.addRoom($('input.addRoom').val());
    app.currentRoom = $('input.addRoom').val();
    $('input.addRoom').val('');
  });

  $('username').on('click', function() {
    console.log('clicked');
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
