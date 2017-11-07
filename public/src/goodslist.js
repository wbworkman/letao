define(['jquery', 'template'], function ($, template) {

    var size = 2;
    //利用正则匹配页码
    var reg = /\?[a-z]+=(\d+)/;
    //处理请求参数
    var search = location.search || '';
    //只有有的时候才取第一个单元
    var page = reg.exec(search) && reg.exec(search)[1];
    //设定默认页码
     page = page || 1;
    $.ajax({
        url: '/api/product/queryProductDetailList',
        type: 'get',
        data: {page: page, pageSize: size},
        success :function (info) {

            // console.log(info);

            var total = info.total;

            var pageLen = Math.ceil(total / size);

            var html = template('tpl', info);

            var pagehtml = template('page', {
                pageLen: pageLen,
                page: page
            });

            $('.goods').html(html);

            $('.pagination').html(pagehtml);
        }
    })



})