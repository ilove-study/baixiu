$('#logout').on('click',function(){
    var isConfirm = confirm('您确定要提出吗')
    if(isConfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(data){
          location = '/admin/login.html'
        },
        error:function(){
          alert('退出失败')
        }
      })
    }
  })
  // 处理日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}