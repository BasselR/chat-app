var socket = io();
var nickname;
console.log("new version ay");
function setNick(){
    nickname = document.getElementById('writeNick').value;
    socket.emit('set nickname', nickname);
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "block";
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