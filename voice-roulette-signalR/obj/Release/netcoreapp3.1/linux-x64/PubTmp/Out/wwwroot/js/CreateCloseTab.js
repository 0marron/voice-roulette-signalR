
function closeTab(object) {

    object.parentElement.style.display = 'none';
    var idname = object.id.substr(2);
    if (document.getElementById("tab" + idname).className == "active" && document.getElementById(idname).className == "tab-pane fade active in") {
        document.getElementById("lihome").className = "active";
        document.getElementById("home").className = "tab-pane fade active in";
    }
    document.getElementById(idname).remove();
    document.getElementById("tab" + idname).remove();
}

function CreateTabOnClick(object) {

    var existTab = document.getElementById("tab" + object.className);
    if (existTab != null) {

        document.getElementById("tab" + object.className).className = "active";
        document.getElementById(object.className).className = "tab-pane fade active in";
        document.getElementById("home").className = "tab-pane fade";
        document.getElementById("lihome").className = "";
        cursorFocus();
    }
    else {
        document.getElementById("lihome").className = "";
        document.getElementById("home").className = "tab-pane fade";

        var name = object.className;
        var ul = document.getElementById("tabsid");
        var li = document.createElement("li");
        li.id = "tab" + name;
        li.onclick = () => {
            document.getElementById("u" + name).innerHTML = "";
            cursorFocus();
        }
        li.className = "active";
        li.innerHTML += "<a id=\"a" + name + "\" data-toggle=\"tab\" href=\"#" + name + "\"> </a>";
        ul.appendChild(li);

        //var textOfTab = document.createElement("a"); //username text
        //textOfTab.id = "name" + name;
        //textOfTab.innerText = name;
        var closebutton = document.createElement("span"); //closebutton
        closebutton.id = "x_" + name;
        closebutton.onclick = function () { closeTab(this); }
        closebutton.className = "topright";
        closebutton.innerHTML = "  ✗";
        var unreadlabel = document.createElement("a");
        unreadlabel.id = "u" + name;
        unreadlabel.innerHTML = "";

        document.getElementById("a" + name).innerHTML += Base64.decode(name);//append username
        document.getElementById("a" + name).appendChild(unreadlabel);//append username
        document.getElementById("a" + name).appendChild(closebutton);//append username

        var tabbodies = document.getElementById("tabbodies");
        var div = document.createElement("div");
        div.className = "tab-pane fade active in";
        div.id = name;

        var divrow = document.createElement("div");
        divrow.className = "row";
        var divinrow = document.createElement("div");
        divinrow.style = "background-color:#f08b5d; width: 100%; overflow-y:scroll;";
        divinrow.id = "private" + name;
        var ulrow = document.createElement("ul");
        ulrow.id = "messages" + name;

        //  div.innerHTML += "<div class=\"row\">    <div style=\"background-color:#aaa; width: 100%; overflow-y:scroll;\">        <ul id=\"messages" + name + "\"></ul>    </div></div>   <input id=\"files" + name + "\" name=\"files\" type=\"file\" size=\"1\"  accept=\"image/*\" onchange=\"AddLocalPrivateImage(this,'" + name + "'); uploadFiles('files" + name + "'); \" />    <div class=\"TextLine" + name + "\"style=\"width:100%;height:20px; float:inline-end;\">    <p>        <input name=\"content" + name + "\" id=\"content" + name + "\" style=\"width: 80%;float: left;\" type=\"text\" onkeydown=\"IsPressEnterPrivate('" + name + "')\" autocomplete=\"off\" maxlength=\"1000\" placeholder=\"Сообщение для ввода\" />        <button type=\"submit\" style=\"width: 20%; float:right;\" onclick=\"AddTextPrivate('" + name + "')\">Send</button>    </p></div>";
        div.appendChild(divrow);
        divinrow.appendChild(ulrow);
        divrow.appendChild(divinrow);
        tabbodies.appendChild(div);





        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href") // activated tab
            var idname = target.replace('#', '');

            if (idname == "home") {
                var cright = document.getElementById("cright");
                cright.scrollTop = cright.scrollHeight;
            } else {
                var cright = document.getElementById("private" + idname);
                cright.scrollTop = cright.scrollHeight;
            }

        });
        cursorFocus();
    }
}

function CreateTabOnRecieve(object) {

    var name = object["messagefrom"];
    var message = object["textmessage"];

    var ul = document.getElementById("tabsid");
    var li = document.createElement("li");
    //    var imageHtml = "<img src = \"" + object["imageUrl"] + "\">"
    var urlmessage = "";
    var fullImageUrl = "";
    urlmessage = object["imageUrl"];
    if (urlmessage != "") {
        fullImageUrl = "https://chatmenow.ru/uploadImages/" + urlmessage;
    }
    var ImageHtml = " <a data-toggle='lightbox' href='#" + object["imageUrl"].replace('.', '_') + "'> <img src='" + fullImageUrl + "' style='width:150px; height:auto;' >		</a>		<div id='" + object["imageUrl"].replace('.', '_') + "' class='lightbox fade'  tabindex='-1' role='dialog' aria-hidden='true'>			<div class='lightbox-dialog'>				<div class='lightbox-content'>					<img src='" + fullImageUrl + "'> 				</div>			</div>		</div>";

    var audio = document.createElement("audio");
    if (object["audio"] != "") {
        audio.src = URL.createObjectURL(b64toBlob(object["audio"]));
        audio.controls = true;

        audio.autoplay = false;
    }



    li.id = "tab" + name;
    li.onclick = () => {
        document.getElementById("u" + name).innerHTML = "";
        cursorFocus();
    }
    //  li.className = "active";
    li.innerHTML += "<a id=\"a" + name + "\" data-toggle=\"tab\" href=\"#" + name + "\"> </a>";
    ul.appendChild(li);

    //var textOfTab = document.createElement("a"); //username text
    //textOfTab.id = "name" + name;
    //textOfTab.innerText = name;
    var closebutton = document.createElement("span"); //closebutton
    closebutton.id = "x_" + name;
    closebutton.onclick = function () { closeTab(this); }
    closebutton.className = "topright";
    closebutton.innerHTML = "  ✗";
    var unreadlabel = document.createElement("a");
    unreadlabel.id = "u" + name;
    unreadlabel.innerHTML = "&#128276";

    document.getElementById("a" + name).innerHTML += Base64.decode(name);//append username
    document.getElementById("a" + name).appendChild(unreadlabel);//append username
    document.getElementById("a" + name).appendChild(closebutton);//append username

    var container = document.getElementById("tabbodies");
    var div = document.createElement("div");
    div.className = "tab-pane fade";
    div.id = name;


    var divrow = document.createElement("div");
    divrow.className = "row";
    var divinrow = document.createElement("div");
    divinrow.style = "background-color:#f08b5d; width: 100%; overflow-y:scroll;";
    divinrow.id = "private" + name;
    var ulrow = document.createElement("ul");
    ulrow.id = "messages" + name;

    var lirow = document.createElement("li");

    lirow.innerHTML += "<a class=\"pmessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode( name) + "</a>" + ", " + message;
    lirow.appendChild(audio);

    lirow.innerHTML += ImageHtml;

    var inputimage = document.createElement("input");
    inputimage.id = "files" + name;
    inputimage.name = "files";
    inputimage.type = "file";
    inputimage.size = "1";
    inputimage.accept = "image/*";
    inputimage.onchange = () => { AddLocalPrivateImage(inputimage, name); uploadFiles('files' + name); };


    ulrow.appendChild(lirow);
    divinrow.appendChild(ulrow);
    divrow.appendChild(divinrow);

    div.appendChild(divrow);

    container.appendChild(div);






    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        var idname = target.replace('#', '');

        if (idname == "home") {
            var cright = document.getElementById("cright");
            cright.scrollTop = cright.scrollHeight;
        } else {
            var cright = document.getElementById("private" + idname);
            cright.scrollTop = cright.scrollHeight;
        }

    });


    var sound = document.getElementById('sound-on-off');
    if (sound.className == "speaker") {
        Beep();
    }
}


function Beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}
