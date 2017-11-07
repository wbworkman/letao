define(['jquery','template','ckeditor','./utils','uploadify'], function ($,template,CKEDITOR) {
    
    CKEDITOR.replace('ck');

    $('form').on('submit', function () {
        var _this = $(this);

        $.ajax({
            url:'/api/product/addProduct',
            type: 'post',
            data: _this.serialize(),
            success: function (info) {
                console.log(info);
                if(info.success) {
                    location.href = '/goods_list.php';
                }       
            }
        })
        return false;
    });
    $('#upfile').uploadify({
        // 修改上传按钮文字
        buttonText: '',
        // 修改上传按钮宽度
        width: 120,
        // 修改上传按钮高度
        height: 120,
        // 上传文件 name 属性
        fileObjName: 'pic1',
        // 自定义上传进度条样式
        itemTemplate: '<span></span>',
        // 使用 flash
        swf: '/public/assets/uploadify/uploadify.swf',
        // 文件上传地址
        uploader: '/api/product/addProductPic',
        onUploadSuccess: function (file, data) {
            // console.log(data)
            var res = JSON.parse(data);
            // 实现预览效果
            $('.preview img').attr('src', 'http://localhost:3000' + res.picAddr);

            // 将图片上传地址放到表单中等待提交
            $('input[name="pic"]').val(res.picAddr);
        }
    });

        $.ajax({
            url: '/api/category/querySecondCategoryPaging',
            type: 'get',
            data: {page: 1, pageSize: 100},
            success: function (info) {
                // console.log(info);
                var html = template('brands', info);

                $('.brand').append(html);
            }
        })
});