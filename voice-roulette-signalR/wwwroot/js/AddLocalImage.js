//function OpenImage(imageX, imageY, img) {
//    var div = document.getElementById("div");
//    div.id = "imageBox";
//    div.className = "imageBox";
//    div.style = "display: block; top: 50px; left: 0px;";
//    var div = document.getElementById("div");
//    div.id = "imageBox";
//}
//function swipe(largeImage) {
//     largeImage.style.display = 'block';
//    largeImage.style.width = 200 + "px";
//    largeImage.style.height = 200 + "px";
//    var url = largeImage.getAttribute('src');
//    window.open(url, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
//}
function AddLocalImage(input) {
    var tabName = document.getElementsByClassName("active")[0].id;
     if (tabName == "lihome") {
         var img = document.createElement("img");
         img.style.width = "150px";
         img.style.height = "auto";
         img.onload = () => scrollDown();

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
            var ul = document.getElementById("messages");
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = "#";
            a.appendChild(img);


            li.innerHTML += "<a class=\"amessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode( UserName) + "</a>" + "⇨";
            li.appendChild(a);

            ul.appendChild(li);
            //document.getElementById("content").value = "";
            //document.getElementById("content").focus();
             
        }
    }

    else {
         var name = tabName.replace('tab', '');
         var img = document.createElement("img");
         img.style.width = "150px";
         img.style.height = "auto";
         img.onload = () => scrollDownPrivate(name);

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
            var ul = document.getElementById("messages" + name);
            var li = document.createElement("li");
            var div = document.getElementById("div");
            var a = document.createElement("a");
            a.href = "#";
            a.appendChild(img);
            li.innerHTML += "<a class=\"omessage\" label=\"label\" href=\"#\" onclick=\"NameChatClick(this)\">" + Base64.decode(UserName) + "</a>" + "⇨";
            li.appendChild(a);

            ul.appendChild(li);
            var cright = document.getElementById("private" + name);
            cright.scrollTop = cright.scrollHeight;
            //document.getElementById("content" + name).value = "";
            //document.getElementById("content" + name).focus();
            //var cright = document.getElementById("private" + name);
            //cright.scrollTop = cright.scrollHeight;
        }
    }
}


    