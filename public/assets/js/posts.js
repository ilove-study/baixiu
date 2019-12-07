
//向服务器发送请求 获取文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(data){
        console.log(data);      
        var html = template('tpl-posts',data);
        $('#postsBox').html(html);
        var page = template('tpl-page',data);
        $('#page').html(page);
    }
})

// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//分页 
function changePage(page){
    //向服务器发送请求 获取文章列表数据
    $.ajax({
        type:'get',
        url:'/posts',
        success:function(data){
            console.log(data);           
            var html = template('tpl-posts',data);
            $('#postsBox').html(html);
        }
    })
}