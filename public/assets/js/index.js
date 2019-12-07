//获取文章的数量
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(data){
        $('#wenzhang').html('<strong>'+data.postCount+'</strong>篇文章（<strong>'+data.draftCount+'</strong>篇草稿）')
        
    }
})

//获取分类的数量
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(data){
        $('#fenlei').html('<strong>'+data.categoryCount+'</strong>个分类')
   
        
    }
})

//获取评论的数量
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(data){
        $('#pinglun').html('<strong>'+data.commentCount+'</strong>条评论')
    }
})