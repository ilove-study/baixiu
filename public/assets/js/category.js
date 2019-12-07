
function serializeObj(form) {
	var arr = form.serializeArray();
	var obj = {};
  
	arr.forEach((item) => {
	  obj[item.name] = item.value;
	})
  
	return obj;
  }
  $('#cateGoryForm').on('submit', function (e) {
	e.preventDefault();
  
	var obj = serializeObj($(this));
  
  
	$.ajax({
	  url: '/categories',
	  type: 'POST',
	  data: obj,
	  success: function (data) {
  
		loadCategory()
	  }
	})
  })
  
  // 拿分类的数据 
  
  function loadCategory() {
	$.ajax({
	  url: '/categories',
	  type: 'GET',
	  success: function (data) {
		var html = template('tpl-categroy', { categroies: data })
		$('#table-data').html(html)
	  }
	})
  }
  
  loadCategory()
  //用事件委托给编辑按钮绑定事件
  $('#table-data').on('click','.edit',function(){
	//获取id
	var id =$(this).attr('data-id')
	// console.log(id);
	$.ajax({
		type:'get',
		url:'/categories/'+id,
		success:function(data){
			console.log(data);
			var html = template('tpl-modifyCategory',data)
			$('#formBox').html(html)
		}
	})
  })

  //当修改分类数据表单提交
  $('#formBox').on('submit','#cateGoryForm',function(){
	//获取用户在表单中输入的内容
	// e.preventDefault();
	// var obj = serializeObj($(this))
	var formData = $(this).serialize();
	//获取要修改分类的id
	var id =$(this).attr('data-id')
	console.log(id);
	
	$.ajax({
		type:'put',
		url:'/categories/'+id,
		data:formData,
		success:function(){
			loadCategory()
		}
	})
	return false;
  })

  //删除分类
  $('#table-data').on('click','.delete',function(){
	  if(confirm('您真的要删除吗')){
		  //获取要删除分类的id
		  var id = $(this).attr('data-id');
		  //向服务器发送请求
		  $.ajax({
			  type:'delete',
			  url:'/categories/'+id,
			  success:function(){
				loadCategory()
			  }
		  })
	  }
  })

  // 全选相关的代码
$('#selectAll').on('change', function () {
	var isChecked = this.checked;
  
	var deleteMany = $('#deleteMany');
  
	if (isChecked) {
	  deleteMany.show();
	} else {
	  deleteMany.hide();
	}
  
	$('#table-data').find('input:checkbox').prop('checked', isChecked)
  })
  
  $('#table-data').on('change', 'input:checkbox', function () {
  
	var allCheckbox = $('#table-data input:checkbox');
  
	var hasChecked = allCheckbox.filter(':checked').length;
  
	var deleteMany = $('#deleteMany');
	
  
	if (hasChecked > 0) {
	  deleteMany.show();
	} else {
	  deleteMany.hide();
	}
  
  
	// 是否已经全部选中
	var checkAll = allCheckbox.length === hasChecked
  
	$('#selectAll').prop('checked', checkAll)
  })