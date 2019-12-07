// $.ajax({
// 	url: '/categories',
// 	type: 'get',
// 	success: function (data) {
// 		console.log(data)
// 		var html = template('categoryTpl', {options: data});
// 		$('#category').html(html);
// 	}
// })
// $('#feature').on('change', function () {
// 	// 获取到管理员选择到的文件
// 	var file = this.files[0];
// 	// 创建formData对象 实现二进制文件上传
// 	var formData = new FormData();
// 	// 将管理员选择到的文件追加到formData对象中
// 	formData.append('cover', file);
// 	// 实现文章封面图片上传
// 	$.ajax({
// 		type: 'post',
// 		url: '/upload',
// 		data: formData,
// 		// 告诉$.ajax方法不要处理data属性对应的参数
// 		processData: false,
// 		// 告诉$.ajax方法不要设置参数类型
// 		contentType: false,
// 		success: function (response) {
// 			console.log(response)
// 			$('#thumbnail').val(response[0].cover);
// 		}
// 	})
// });
// 查询 文章的分类
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (data) {
      console.log(data);
  
      var html = template('tpl-options', { options: data })
  
      $('#category').html(html)
    }
  })
  
  // 处理上传图片
  $('#feature').on('change', function () {
    // 1. 准备一个formdata
    var formdata = new FormData();
  
    formdata.append('cover', this.files[0])
  
    // 开始上传图片
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formdata,
  
      processData: false,
      contentType: false,
  
      success: function (data) {
  
        if (data && data.length > 0) {
          var url = data[0].cover;
          $('#thumbnailField').val(url)
        }
      }
    })
  })

  //当添加文章提交的时候

  $('#addForm').on('submit',function(){
      //获取用户输入的内容
      var formData = $(this).serialize()
      //向服务器发送请求 实现添加文章功能
      $.ajax({
          type:'post',
          url:'/posts',
          data:formData,
          success:function(){
              //文章添加成功跳转到文章列表页面
              location.href = '/admin/posts.html'
          }
      })
      return false;
  })
  // 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
	// 根据id获取文章的详细信息
	$.ajax({
		type: 'get',
		url: '/posts/' + id,
		success: function (data) {
			$.ajax({
				url: '/categories',
				type: 'get',
				success: function (categories) {
					data.categories = categories;
					// console.log(data)
					var html = template('tpl-modify', data);
					$('#parentBox').html(html);
				}
			})
			
		}
	})
}
  function getUrlParams(name){
    var query = location.search.slice(1).split('&')  
    var value = -1;
    if(query && query.length>0){
        query.forEach(item =>{
            var tmp = item.split('=')      
        if(name === tmp[0]){
            value = tmp[1]
        }
    })
    }
    return value;
}

//当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit','#addForm',function(){
  //获取管理员在表单中输入的内容
  var formData = $(this).serialize();
  //获取管理要修改的文章内容id
  var id = $(this).attr('data-id');
  $.ajax({
    type:'put',
    url:'/posts/'+ id,
    data:formData,
    success:function(){
      location.href = '/admin/posts.html'
    }
  })
  return false;
})