var socket = io();
var nickname;
console.log("22/07/2020");

const myInput = document.getElementById("writeNick");
$('#writeNick').focus();

myInput.addEventListener("keyup", function(event) {
  // 13 === 'enter' key
  if (event.keyCode === 13) {
    event.preventDefault();
    setNick();
  }
});

function setNick(){
    nickname = document.getElementById('writeNick').value;
    socket.emit('set nickname', nickname);
    $('#first').fadeOut();
    $('#second').show();
    $('#m').focus();
    // document.getElementById('first').style.display = "none";
    // document.getElementById('second').style.display = "block";
}
$(function () {
    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading
        let msg = $('#m').val();
        console.log("msg: " + msg);
        socket.emit('chat message', msg);
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});