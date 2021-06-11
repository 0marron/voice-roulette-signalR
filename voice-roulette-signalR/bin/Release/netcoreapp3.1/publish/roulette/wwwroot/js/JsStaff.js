   function GetTime() {
            var Date = new Date();
            var h = checkTime(Time.getHours());
            var m = checkTime(Time.getMinutes());
            var s = checkTime(Time.getSeconds());
            var time = h + ":" + m + ":" + s;
            return time;
        }
        function IsPressEnter() {
            if (event.keyCode == 13) {
                AddText();
            }
        }
      

        function NameChatClick(nickname) {
            var name = nickname.innerText;
            $('.emojionearea-editor').text(name + '->');
            //document.getElementsByClassName('emojionearea-editor')[0].focus();

          
  
        }
        function SendPublicMessage() {

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "/Home/Ping", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("cookieName=" + getCookie("Session"));
}

function Scroll() {

        var cleft = document.getElementById("cright");
        cleft.scrollTop = cleft.scrollHeight;
    
}
function cursorFocus() {
    $('.emojionearea-editor').text('');
    $('.emojionearea-editor').focus(); 
}