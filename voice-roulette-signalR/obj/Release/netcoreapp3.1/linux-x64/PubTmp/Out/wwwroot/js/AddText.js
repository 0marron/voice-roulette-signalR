
String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;

    if (typeof token === "string") {
        if (ignoreCase) {
            _token = token.toLowerCase();
            while ((
                i = str.toLowerCase().indexOf(
                    _token, i >= 0 ? i + newToken.length : 0
                )) !== -1
            ) {
                str = str.substring(0, i) +
                newToken +
                str.substring(i + token.length);
            }
        } else {
            return this.split(token).join(newToken);
        }

    }
    return str;
};
function time() {
    var d = new Date();
    var n = d.getTime();
    return n;
}
function IsUrlAndImage(str) {

    
    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);

    if (str.match(regex)) {

        var parts = str.split('.');
        var extension = parts[parts.length - 1];
        var imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp']
        if (imageTypes.indexOf(extension) !== -1) {
            return "true";
        }
        else if (str.includes('http://s3-us-west-1.amazonaws.com/porngifs/img')) {
            return "true";
        }
        else {
            return "false";
        }
    } else {
        return "false";
    }
}




function IsUrlAndMP4(str) {


    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);

    if (str.match(regex)) {

        var parts = str.split('.');
        var extension = parts[parts.length - 1];
        var imageTypes = ['mp4']
        if (imageTypes.indexOf(extension) !== -1) {
            return "true";
        }
    } else {
        return "false";
    }
}


function UrlSepar(input) {
    var urlRegex = /(https?:\/\/[^ ]*)/;
    var url = "";
    try {
         url = input.match(urlRegex)[1];

    } catch{
        url = "";
    }
     return url;
}
function IsUrlAndYoutube(str) {
    var expression = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var regex = new RegExp(expression);

    if (str.match(regex)) {
        if (str.includes("you")) {
            return "true"
        } else {
            return "false";
        }

    } else {
        return "false";
    }
}
function AddText() {

    var tabName = document.getElementsByClassName("active")[0].id;
    var textOfMessage = document.getElementsByClassName('emojionearea-editor')[0].innerHTML;
 
    if (tabName == "lihome") {
 
        var ul = document.getElementById("messages");
        var li = document.createElement("li");

        if (textOfMessage != "") {
 
            // if url is image
            var ImageHtml = ""; 
             var Url = UrlSepar(textOfMessage);
 
            if (IsUrlAndImage(Url) == "true") {
          
                var timeSpan = time(); 
                 var ImageHtml = "";
                if (isshowimage == true) {
                    ImageHtml = " <a class='imagePublic' data-toggle='lightbox' href='#" + timeSpan +"'>			<img src='" + Url + "' style='width:50px; height:auto;' onload='scrollDown();' alt='" + Url + "'>		</a>		<div id='" + timeSpan + "' class='lightbox fade'  tabindex='-1' role='dialog' aria-hidden='true'>			<div class='lightbox-dialog'>				<div class='lightbox-content'>					<img src='" + Url + "' alt='" + Url +"'> 				</div>			</div>		</div>";

                } else if (isshowimage == false) {
                     ImageHtml = Url;

                }
                textOfMessage = textOfMessage.replace(Url, ImageHtml);
            }
            if (IsUrlAndYoutube(Url) == "true") {
                var youtubeId = "";
                if (Url.includes("youtu.be")) {
                    let _l = Url;
                    _l = Url.replace("https://youtu.be/","");
                    youtubeId = _l.split('?')[0];

                } else {
                     youtubeId = Url.split('=')[1];

                }
                var _youtube = "https://www.youtube.com/embed/" + youtubeId;
                ImageHtml = "<iframe frameborder=\"0\" allowfullscreen=\"1\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"   width=\"320\" height=\"215\"src=\"" + _youtube + "\"> </iframe>";
                textOfMessage = textOfMessage.replace(Url, ImageHtml);
            }


            if (IsUrlAndMP4(Url) == "true") {
            
                ImageHtml = " <video    preload=\"metadata\" controls=\"controls\" loop style=\"height:auto; width:300px;\" > <source  src=\"" + Url +"\"  type=\"video/mp4\"></video>";
                textOfMessage = textOfMessage.replace(Url, ImageHtml);
            }


            li.innerHTML += "<a class=\"amessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(UserName) + "</a>" + "⇨" + textOfMessage;
 
            ul.appendChild(li);
             
            if (textOfMessage) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/Home/SendMessage", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                 
                xmlhttp.send("cookieName=" + getCookie("Session") + "&" + "message=" + encodeURIComponent(textOfMessage) + "&recipient=" );
            }
            $('.emojionearea-editor').text('');
            $('.emojionearea-editor').focus();        

            var div = document.getElementById("cright");
            div.scrollTop = div.scrollHeight - div.clientHeight;
 
        }
    }


    else if (tabName.includes("tab")) {
        var name = tabName.replace("tab", "");
         var ImageHtml = "";
        var Url = UrlSepar(textOfMessage);
         if (textOfMessage != "") {
 
            if (IsUrlAndImage(Url) == "true") {
               
                var timeSpan = time();
                ImageHtml = "       <a data-toggle=\"lightbox\" href=\"#" + timeSpan + "\">			<img src=\"" + Url + "\" style=\"width:150px; height:auto;\" onload=\"scrollDownPrivate('"+name+"');\" >		</a>		<div id=\"" + timeSpan + "\" class=\"lightbox fade\"  tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">			<div class=\"lightbox-dialog\">				<div class=\"lightbox-content\">					<img src=\"" + Url + "\"> 				</div>			</div>		</div>";
                textOfMessage = textOfMessage.replace(Url, ImageHtml);
            }
             if (IsUrlAndYoutube(Url) == "true") {
                 var youtubeId = Url.split('=')[1];
                 var _youtube = "https://www.youtube.com/embed/" + youtubeId;
                 ImageHtml = "<iframe width=\"320\" height=\"215\"src=\"" + _youtube + "\"> </iframe>";
                 textOfMessage = textOfMessage.replace(Url, ImageHtml);
             }
             var ul = document.getElementById("messages" + name);
            var li = document.createElement("li");
             var div = document.getElementById("div");
             li.innerHTML += "<a class=\"omessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode( UserName) + "</a>" + "⇨" + textOfMessage + "";
            
            ul.appendChild(li);
            
             
            if (textOfMessage) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/Home/PrivateMessage", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

              //  textOfMessage = textOfMessage.replaceAll('"', '&quot;');

                xmlhttp.send("cookieName=" + getCookie("Session") + "&" + "message=" + encodeURIComponent(textOfMessage) + "&" + "recipient=" + name);
            }
        }
        $('.emojionearea-editor').text('');
        $('.emojionearea-editor').focus();        
        var cright = document.getElementById("private" + name);
        cright.scrollTop = cright.scrollHeight;

    }
    else if (tabName.includes("_grouproom_")) {

        var name = tabName.replace("_grouproom_", "");
        var ImageHtml = "";
        var Url = UrlSepar(textOfMessage);
        if (textOfMessage != "") {

            if (IsUrlAndImage(Url) == "true") {

                var timeSpan = time();
                ImageHtml = "       <a data-toggle=\"lightbox\" href=\"#" + timeSpan + "\">			<img src=\"" + Url + "\" style=\"width:150px; height:auto;\" onload=\"scrollDownPrivate('" + name + "');\" >		</a>		<div id=\"" + timeSpan + "\" class=\"lightbox fade\"  tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">			<div class=\"lightbox-dialog\">				<div class=\"lightbox-content\">					<img src=\"" + Url + "\"> 				</div>			</div>		</div>";
                textOfMessage = textOfMessage.replace(Url, ImageHtml);
            }
            if (IsUrlAndYoutube(Url) == "true") {
                var youtubeId = Url.split('=')[1];
                var _youtube = "https://www.youtube.com/embed/" + youtubeId;
                ImageHtml = "<iframe width=\"320\" height=\"215\"src=\"" + _youtube + "\"> </iframe>";
                textOfMessage = textOfMessage.replace(Url, ImageHtml);
            }
            var ul = document.getElementById("messages" + "_grouproom_" + name);
            var li = document.createElement("li");
            var div = document.getElementById("div");
            li.innerHTML += "<a class=\"omessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(UserName) + "</a>" + "⇨" + textOfMessage + "";

            ul.appendChild(li);


            if (textOfMessage) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/Home/GroupMessage", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                 
                xmlhttp.send("cookieName=" + getCookie("Session") + "&" + "message=" + encodeURIComponent(textOfMessage) + "&" + "chatRoomName=" +"_grouproom_"+ name);
            }
        }
        $('.emojionearea-editor').text('');
        $('.emojionearea-editor').focus();
        var cright = document.getElementById("private" + "_grouproom_"+ name);
        cright.scrollTop = cright.scrollHeight;
    }

     
} 