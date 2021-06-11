



function AddLocalAudio(input) {
    var tabName = document.getElementsByClassName("active")[0].id;
    if (tabName == "lihome") {
        var audioPrivate = document.createElement("audio");
        audioPrivate.src = URL.createObjectURL(input);
        audioPrivate.controls = true;

         audioPrivate.autoplay = false;
        var ul = document.getElementById("messages");
        var li = document.createElement("li");
        li.innerHTML += "<a class=\"amessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode( UserName )+ "</a>, ";
        li.appendChild(audioPrivate);

        ul.appendChild(li);
        //document.getElementById("content").value = "";
        //document.getElementById("content").focus();
        var cleft = document.getElementById("cright");
        cleft.scrollTop = cleft.scrollHeight;
         

    }
    else {
        var name = tabName.replace('tab', '');
         
        var audioPrivate = document.createElement("audio");
        audioPrivate.src = URL.createObjectURL(input);
        audioPrivate.controls = true;
        audioPrivate.autoplay = false;
        var ul = document.getElementById("messages" + name);
        var li = document.createElement("li");
        var div = document.getElementById("div");
        var a = document.getElementById("a");
        li.innerHTML += "<a class=\"omessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(UserName) + "</a> , ";
        li.appendChild(audioPrivate);

        ul.appendChild(li);
        //document.getElementById("content" + name).value = "";
        //document.getElementById("content" + name).focus();
        var cright = document.getElementById("private" + name);
        cright.scrollTop = cright.scrollHeight;

    }
}