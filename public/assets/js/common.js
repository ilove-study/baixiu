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