
//取评论数据
$.ajax({
    url: '/comments',
    type: 'get',
    success: function (data) {
        // console.log(data);
        var html = template('tpl-pl', data)
        // console.log(html);
        $('#data-container').html(html)
        var pageHTML = template('tpl-page', data);
		$('#pageBox').html(pageHTML)
    }
})

//实现分页
// function changePage(page) {
//     $.ajax({
//         url: '/comments',
//         type: 'get',
//         data: {
//             page: page
//         },
//         success: function (data) {
//             console.log(data);
//             var page1 = template('tpl-page', data)
//             $('#pageBox').html(page1)
//             var html = template('tpl-pl', data)
//             // console.log(html);
//             $('#data-container').html(html)
//         }data-container
//     })
// }
function changePage (page) {
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			page: page
		},
		success: function (response) {
			console.log(response)
			var html = template('tpl-pl', response);
			$('#data-container').html(html);
			var pageHTML = template('tpl-page', response);
			$('#pageBox').html(pageHTML) 
		}
	})    
}

//当审核按钮被点击时
$('#data-container').on('click', '.status', function () {
    //获取当前评论的状态
    var status = $(this).attr('data-status')
    //获取被点击评论的id值
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success:function(data){
            location.reload()
            
        }
    })
    

})

//给删除按钮绑定点击事件
$('#data-container').on('click','.delete',function(){
    var id = $(this).attr('data-id')
    // console.log(id);
    if(confirm('您真的要删除这条评论吗')){
        $.ajax({
            type:'delete',
            url: '/comments/' + id,
            success:function(data){
                location.reload();
                
            }
        })
    }
    
})