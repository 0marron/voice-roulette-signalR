
var UserName = getCookie("Session");
var tries = 0;
var localNameAudio = "";
var rec = null;




setTimeout(function run() {

 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/Home/Ping", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var HtmlUsers = "";
            var usersArray = [];
            var Response = JSON.parse(xmlhttp.responseText);
            var temp = Response["userList"]
            if (temp.includes(',')) {
                usersArray = temp.split(',');
            }
            else {
                usersArray.push(temp);
            }
            if (!temp.includes(UserName)) {
                document.location.href = "/";
            }
            var openedTab = document.getElementsByClassName('active')[0].id;
            var idname = openedTab.replace('tab', '');


            if (idname != "lihome") {
                if (!usersArray.includes(idname)) {
                    try {

                        if (document.getElementById("tab" + idname).className == "active" && document.getElementById(idname).className == "tab-pane fade active in") {
                            document.getElementById("lihome").className = "active";
                            document.getElementById("home").className = "tab-pane fade active in";
                        }
                        document.getElementById(idname).remove();
                        document.getElementById("tab" + idname).remove();
                    } catch{}
                }
            }


            var reciveMessages = Response["messages"];

            usersArray.forEach(function (element) {
                if (UserName == element) {
                    HtmlUsers += "<li> <a label=\"label\"><span>" + Base64.decode(element) + "</span></a> </li>";

                } else {
                    HtmlUsers += "<li><a class=\"" + element +"\" onclick=\"CreateTabOnClick(this)\"   label=\"label\" href=\"#\"><span class=\"context-menu-one btn btn-neutral\">" + Base64.decode(element) + "</span></a></li>";
                }
            })

            reciveMessages.forEach(function (_message) {
            

                     if (typeof _message["messagefrom"] != 'undefined' && _message["messagefrom"] == "" && _message["chatRoomName"] == "") {
                    var ul = document.getElementById("messages");
                    var li = document.createElement("li");
                    var _div_ = document.createElement("div");


                    var audio = document.createElement("audio");
                    if (_message["audio"] != "") {
                        var downloadUrl = URL.createObjectURL(b64toBlob(_message["audio"]));
                        audio.src = downloadUrl;
                        audio.controls = true;
                        audio.autoplay = false;
                    }


                    //var img = document.createElement("img");
                    //img.src = _message["imageUrl"];
                    //img.onload = () =>scrollDown();
                    //var a = document.createElement("a");
                    //a.href = "#";
                    //a.appendChild(img);


                    var ImageHtml = "";
                    var textOfMessage = _message["textmessage"]
                    var Url = UrlSepar(textOfMessage);

                    //if (IsUrlAndImage(Url) == "true") {
                    ////    li.innerHTML += "<a class=\"amessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(_message["username"]) + "</a>" + ", " + textOfMessage + "";

                    //    var timeSpan = time();
                    //    ImageHtml = "       <a data-toggle='lightbox' href='#" + timeSpan + "'>			<img src='" + Url + "' style='width:150px;' onload='scrollDown();'>		</a>		<div id='" + timeSpan + "' class='lightbox fade'  tabindex='-1' role='dialog' aria-hidden='true'>			<div class='lightbox-dialog'>				<div class='lightbox-content'>					<img src='" + Url + "'> 				</div>			</div>		</div>";
                    //    textOfMessage = textOfMessage.replace(Url, ImageHtml);
                    //}


                    li.innerHTML += "<a class=\"amessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(_message["username"]) + "</a>" + ", " + textOfMessage + "";


                    var urlmessage = "";
                    var fullImageUrl = "";
                    urlmessage = _message["imageUrl"];
                    if (urlmessage != "") {
                        fullImageUrl = "https://chatmenow.ru/uploadImages/" + urlmessage;
                        var ImageHtml = "";
                        if (isshowimage == false) {
                            ImageHtml = fullImageUrl;
                        } else if (isshowimage == true) {
                            ImageHtml = "<a class='imagePublic' data-toggle='lightbox' href='#" + _message["imageUrl"].replace('.', '_') + "'>			<img src='/image-preview.png' style='width:50px; height:auto;' onload='scrollDown()'; >		</a>		<div id='" + _message["imageUrl"].replace('.', '_') + "' class='lightbox fade'  tabindex='-1' role='dialog' aria-hidden='true'>			<div class='lightbox-dialog'>				<div class='lightbox-content'>					<img src='" + fullImageUrl + "'> 				</div>			</div>		</div>";
                        }
                        li.innerHTML += ImageHtml;
                    }

                    li.appendChild(audio);

                    ul.appendChild(li);
                    document.getElementById("content").value = "";
                    document.getElementById("content").focus();
                    if (isshowimage == false) {
                        $(".imagePublic img").removeAttr("src");
                    }
                    var cleft = document.getElementById("cright");
                    cleft.scrollTop = cleft.scrollHeight;
                }
                else if (typeof _message["messagefrom"] != 'undefined' && _message["messagefrom"] != "" && _message["chatRoomName"] == "") {
                    var _id = "tab" + _message["messagefrom"];
                    var idofuser = document.getElementById(_id);

                    if (idofuser == null) {
                        CreateTabOnRecieve(_message);
                    }
                    else {
                        var name = _message["messagefrom"];
                        if (document.getElementById("tab" + name).className != "active") {
                            document.getElementById("u" + name).innerHTML = "&#128276";
                            var sound = document.getElementById('sound-on-off');
                            if (sound.className == "speaker") {
                                Beep();
                            }
                        }


                        var ul = document.getElementById("messages" + _message["messagefrom"]);
                        var li = document.createElement("li");
                        var div = document.getElementById("div");
                        var a = document.getElementById("a");


                        var audio = document.createElement("audio");
                        if (_message["audio"] != "") {
                            var downloadUrl = URL.createObjectURL(b64toBlob(_message["audio"]));
                            audio.src = downloadUrl;
                            audio.controls = true;
                            audio.autoplay = false;
                        }



                        //var img = document.createElement("img");
                        //img.src = _message["imageUrl"];
                        //img.onload = () => scrollDownPrivate(name);
                        //var a = document.createElement("a");
                        //a.href = "#";
                        //a.appendChild(img);

                        var ImageHtml = "";
                        var textOfMessage = _message["textmessage"]
                        var Url = UrlSepar(textOfMessage);

                        //if (IsUrlAndImage(Url) == "true") {

                        //    var timeSpan = time();
                        //    ImageHtml = "       <a data-toggle=\"lightbox\" href=\"#\"" + timeSpan + ">			<img src=\"" + Url + "\" style=\"width:150px; \" onload=\"scrollDownPrivate('" + name + "');\" >		</a>		<div id=\"" + timeSpan + "\" class=\"lightbox fade\"  tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">			<div class=\"lightbox-dialog\">				<div class='lightbox-content'>					<img src=\"" + Url + "\"> 				</div>			</div>		</div>";
                        //    textOfMessage = textOfMessage.replace(Url, ImageHtml);
                        //}

                        li.innerHTML += "<a class=\"pmessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(_message["messagefrom"]) + "</a>" + ", " + textOfMessage + "";
                        //li.appendChild(img);
                        var urlmessage = "";
                        var fullImageUrl = "";
                        urlmessage = _message["imageUrl"];
                        if (urlmessage != "") {
                            fullImageUrl = "https://chatmenow.ru/uploadImages/" + urlmessage;
                        }

                        var ImageHtml = "";
                        if (isshowimage == false) {
                            ImageHtml = fullImageUrl;
                        } else if (isshowimage == true) {
                            ImageHtml = "<a data-toggle='lightbox' href='#" + _message["imageUrl"].replace('.', '_') + "'>			<img src='" + fullImageUrl + "' style='width:50px; height:auto;' onload='scrollDown()'; >		</a>		<div id='" + _message["imageUrl"].replace('.', '_') + "' class='lightbox fade'  tabindex='-1' role='dialog' aria-hidden='true'>			<div class='lightbox-dialog'>				<div class='lightbox-content'>					<img src='" + fullImageUrl + "'> 				</div>			</div>		</div>";
                        }

                        li.innerHTML += ImageHtml;

                        li.appendChild(audio);

                        ul.appendChild(li);
                     
                        var cleft = document.getElementById("private" + name);
                        cleft.scrollTop = cleft.scrollHeight;
                    }
                }
                else if (typeof _message["messagefrom"] != 'undefined'  &&  _message["chatRoomName"] != "") {
                    
                        var name = _message["chatRoomName"];
                        if (document.getElementById(name).className != "room active") {
                            document.getElementById("u" + name).innerHTML = "&#128276";
                            var sound = document.getElementById('sound-on-off');
                            if (sound.className == "speaker") {
                                Beep();
                            }
                        }


                    var ul = document.getElementById("messages" + _message["chatRoomName"]);
                        var li = document.createElement("li");
                        var div = document.getElementById("div");
                        var a = document.getElementById("a");


                        var audio = document.createElement("audio");
                        if (_message["audio"] != "") {
                            var downloadUrl = URL.createObjectURL(b64toBlob(_message["audio"]));
                            audio.src = downloadUrl;
                            audio.controls = true;
                            audio.autoplay = false;
                        }



                        //var img = document.createElement("img");
                        //img.src = _message["imageUrl"];
                        //img.onload = () => scrollDownPrivate(name);
                        //var a = document.createElement("a");
                        //a.href = "#";
                        //a.appendChild(img);

                        var ImageHtml = "";
                        var textOfMessage = _message["textmessage"]
                        var Url = UrlSepar(textOfMessage);

                        //if (IsUrlAndImage(Url) == "true") {

                        //    var timeSpan = time();
                        //    ImageHtml = "       <a data-toggle=\"lightbox\" href=\"#\"" + timeSpan + ">			<img src=\"" + Url + "\" style=\"width:150px; \" onload=\"scrollDownPrivate('" + name + "');\" >		</a>		<div id=\"" + timeSpan + "\" class=\"lightbox fade\"  tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">			<div class=\"lightbox-dialog\">				<div class='lightbox-content'>					<img src=\"" + Url + "\"> 				</div>			</div>		</div>";
                        //    textOfMessage = textOfMessage.replace(Url, ImageHtml);
                        //}

                        li.innerHTML += "<a class=\"pmessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(_message["username"]) + "</a>" + ", " + textOfMessage + "";
                        //li.appendChild(img);
                        var urlmessage = "";
                        var fullImageUrl = "";
                        urlmessage = _message["imageUrl"];
                        if (urlmessage != "") {
                            fullImageUrl = "https://chatmenow.ru/uploadImages/" + urlmessage;
                        }

                        var ImageHtml = "";
                        if (isshowimage == false) {
                            ImageHtml = fullImageUrl;
                        } else if (isshowimage == true) {
                            ImageHtml = "<a data-toggle='lightbox' href='#" + _message["imageUrl"].replace('.', '_') + "'>			<img src='" + fullImageUrl + "' style='width:50px; height:auto;' onload='scrollDown()'; >		</a>		<div id='" + _message["imageUrl"].replace('.', '_') + "' class='lightbox fade'  tabindex='-1' role='dialog' aria-hidden='true'>			<div class='lightbox-dialog'>				<div class='lightbox-content'>					<img src='" + fullImageUrl + "'> 				</div>			</div>		</div>";
                        }

                        li.innerHTML += ImageHtml;

                        li.appendChild(audio);

                        ul.appendChild(li);
                    
                        var cleft = document.getElementById("private" + name);
                        cleft.scrollTop = cleft.scrollHeight;
                    
                }
                //if (document.getElementById("cright").clientWidth < 500) {
                //    $('#cright').css("overflow-y", "hidden");
                // }
                //if (document.getElementById("cright").clientWidth > 500) {
                //    $('#cright').css("overflow-y", "scroll");
                //}
            })
            var users = document.getElementById("users");
            users.innerHTML = HtmlUsers;
            tries = 0;
        }
    };
    if (xmlhttp.readyState == 1) {

        tries++;
        if (tries > 10) {
            document.location.href = "https://chatmenow.ru/";
        }
        if (UserName == "undefined") {
            document.location.href = "https://chatmenow.ru/";
        }

    }


    var cookie = getCookie("Session");
    if (cookie == "undefined") {
        document.location.href = "https://chatmenow.ru/";
    }

    let Rooms = document.getElementsByClassName("room");
    var arrRooms = [];
    let jsonRoms = null;
   
    for (var i = 0; i < Rooms.length; i++) {
         arrRooms.push(Rooms[i].id.replace(",",""))
    }
    if (arrRooms.length > 0) {
        jsonRoms = arrRooms.join(",");
    }
    else {
        jsonRoms = null;
    }
 
    xmlhttp.send("cookieName=" + cookie + "&fp=" + fp + "&groupRooms=" + jsonRoms);
    setTimeout(run, 3000);
}, 3000);

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


$('#recButton').addClass("notRec");

$('#recButton').click(function () {
    if ($('#recButton').hasClass('notRec')) {
        $('#recButton').removeClass("notRec");
        $('#recButton').addClass("Rec");
    }
    else {
        $('#recButton').removeClass("Rec");
        $('#recButton').addClass("notRec");
    }
});

function b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'audio/x-mpeg-3' });
}


function PostAudio(blob, from) {

    var tabName = document.getElementsByClassName("active")[0].id;
    var to = "";

    if (tabName == "lihome") {
        to = "";
    } else {
        to = tabName.replace('tab', '');
    }
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        var base64toBlob = reader.result;
        var fd = new FormData();
        fd.append('audiofile', base64toBlob);
        fd.append('from', from);
        fd.append('to', to);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Home/UAudio', true);
        xhr.onload = function (e) {
            if (this.status == 200) {
                if (this.response != "") {
                    var downloadUrl = URL.createObjectURL(b64toBlob(this.response));
                    recordedAudio.src = downloadUrl;
                    recordedAudio.controls = "true";
                    recordedAudio.autoplay = false;
                }

            } else {
                alert('Unable to download excel.')
            }
        };
        xhr.send(fd);
    }
}


navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        rec = new MediaRecorder(stream);
        rec.ondataavailable = e => {
            audioChunks.push(e.data);
            if (rec.state == "inactive") {
                let blob = new Blob(audioChunks, { type: 'audio/x-mpeg-3' });

                AddLocalAudio(blob);

                PostAudio(blob, UserName);

            }
        }
    }).catch(e => console.log(e));

function StartStopRecord(a) {
    if (a.className == "Rec") {

        rec.stop();
        //  a.className = "notRec"
    } else
        if (a.className == "notRec") {
            audioChunks = [];
            rec.start();
            // a.className = "Rec"

        }
    //$('#recButton').addClass("notRec");

    //$('#recButton').click(function () {
    //    if ($('#recButton').hasClass('notRec')) {
    //        audioChunks = [];
    //        rec.start();
    //        $('#recButton').removeClass("notRec");
    //        $('#recButton').addClass("Rec");
    //    }
    //    else {
    //        rec.stop();

    //        $('#recButton').removeClass("Rec");
    //        $('#recButton').addClass("notRec");
    //    }
    //});


}




function _startRecPrivat(event) {
    localNameAudio = this.id;
    var temp = localNameAudio;
    var nameTo = temp.replace("startRecord", "").replace("stopRecord", "");
    document.getElementById("startRecord" + nameTo).disabled = true;
    document.getElementById("stopRecord" + nameTo).disabled = false;
    audioChunks = [];
    rec.start();
}

function _stopRecPrivat(event) {
    localNameAudio = this.id;
    var temp = localNameAudio;
    var nameTo = temp.replace("startRecord", "").replace("stopRecord", "");
    document.getElementById("startRecord" + nameTo).disabled = false;
    document.getElementById("stopRecord" + nameTo).disabled = true;
    rec.stop();
}






