function uploadFiles(inputId) {

    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
    formData.append("files", files[0]);
    formData.append("from", UserName);
    var tabName = document.getElementsByClassName("active")[0].id;

    if (tabName == "lihome") {
        formData.append("to", "");
    }
    else if (tabName.includes("_grouproom_"))
    {
        var imageTo = tabName.replace('tab', '');
        formData.append("chatRoomName", tabName);
    }
    else {
        var imageTo = tabName.replace('tab', '');
        formData.append("to", imageTo);
    }
    $.ajax(
        {
            dataType: 'text',  
            
            url: "/Home/UploadImage",
            enctype:"multipart/form-data",
            data: formData,
            processData: false,
            contentType: false,
            type: "post",
            success: function (response) {

            },
            error: function (response) {
                alert("Ошибка загрузки фото. Возможно, размер превышает 5 мегабайт");
            }
        }
    );
    document.getElementById(inputId).value = null;

    var cleft = document.getElementById("cright");
    cleft.scrollTop = cleft.scrollHeight;
}