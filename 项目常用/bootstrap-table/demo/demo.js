(function () {
    var hk = {
        init: function () {
            this.initEvent()
        },
        initEvent: function () {

        },
        //  上传头像
        uploadAvatar: function () {
            let file = $("#avatar")[0];
            file.onchange = function () {
                //创建一个FormDate
                var formData = new FormData();
                //将文件信息追加到其中
                formData.append('file', file.files[0]);
                //利用split切割，拿到上传文件的格式
                var src = file.files[0].name,
                    formart = src.split(".")[1];
                //使用if判断上传文件格式是否符合               
                if (formart == "jpg" || formart == "png") {
                    //只有满足以上格式时，才会触发ajax请求
                    $.ajax({
                        url: 'http://170.0.0.1/upload',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            //上传成功之后，返回对象data                 
                            if (data.code > 0) {
                                var src = data.avatarData;
                                console.log(src)
                                //利用返回值 src 网络路径，来实现上传文档的下载        
                                // $('.uploadimg').attr('src', src);
                                // $('input[name=uploadLink]').val(src); //	隐藏input保存着图片的访问路径, 用于提交form
                            } else {
                                alert("文件格式不支持上传")
                            }
                        }
                    })
                }
            };
        }

    }
    return hk.init()
})()