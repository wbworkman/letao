//模块公共配置
require.config({
    baseUrl: '/public',
    paths: {
        jquery: 'assets/jquery/jquery.min',
        template: 'assets/artTemplate/template-web',
        uploadify: 'assets/uploadify/jquery.uploadify.min',
        nprogress: 'assets/nprogress/nprogress',
        ckeditor: 'assets/ckeditor/ckeditor'
    },
    shim: {
        uploadify: {
            deps:['jquery']
        },
        ckeditor: {
            exports: 'CKEDITOR'
        }
    }
});
require(['nprogress', 'jquery'], function (Nprogress, $){
    Nprogress.start();

    Nprogress.done();

    //当ajax请求时也需要 进度条显示
    $(document).ajaxStart(function () {
        Nprogress.start();
    }).ajaxStop(function () {
        Nprogress.done();
    })
});