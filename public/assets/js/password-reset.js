function serializeObj(form) {
    var arr = form.serializeArray()
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
}
$('#resetForm').on('submit', function (e) {
    e.preventDefault();
    //收集表单的书库
    var obj = serializeObj($(this))
    $.ajax({
        type:'put',
        url:'/users/password',
        data:obj,
        success:function (data) {
            alert('密码修改成功请重新登录')
            location.href = '/admin/login.html'
        },
        error:function(xhr,text,data){
            var obj = JSON.parse(xhr.responseText)
            alert(obj.message)
        }
    })
})
// 绑定事件

// function serializeObj(form) {
//     var arr = form.serializeArray();
//     var obj = {};
//     arr.forEach((item) => {
//       obj[item.name] = item.value;
//     })
//     return obj;
//   } 
//   $('#resetForm').on('submit', function (e) {
//     e.preventDefault();
//     // 收集表单的数据 
//     var obj = serializeObj($(this));

//     // todo 加上密码长度的校验

//     // 发送请求
//     $.ajax({
//       url: '/users/password',
//       type: 'PUT',
//       data: obj,
//       success: function (data) {
//         alert('密码修改成功请重新登录！');
//         location.href = '/admin/login.html'
//       },
//       error: function (xhr, text, data) {
//         var obj = JSON.parse(xhr.responseText);
//         alert(obj.message);
//       }
//     })
  
//   })