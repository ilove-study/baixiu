//当管理员选择文件的时候
$('#file').on('change', function () {
    //用户选择到的文件
    var file = this.files[0];
    console.log(file);
    
    //创建formData对象实现二进制文件上传
    var formData = new FormData();
    formData.append('image', file);
    //想服务器发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success:function(data){
            $('#image').val(data[0].image)       
        }
    })
})

//当轮播图片发生提交时
$('#slidesForm').on('submit',function(){
    //获取用户输入的内容
    var formData = $(this).serialize();
    //向服务器发送请求
    $.ajax({
        url:'/slides',
        type:'post',
        data:formData,
        success:function(){
            location.reload()
            
        }
    })
    return false;
})

// 向服务器端发送请求 索要图片轮播列表数据
$.ajax({
	type: 'get',
	url: '/slides',
	success: function (response) {
		console.log(response)
		var html = template('tpl-slides', {data: response});
		$('#slidesBox').html(html);
	}
})