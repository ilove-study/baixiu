// // 当表单发生提交行为的时候
// $('#userForm').on('submit', function () {
// 	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
// 	var formData = $(this).serialize();
// 	// 向服务器端发送添加用户的请求
// 	$.ajax({
// 		type: 'post',
// 		url: '/users',
// 		data: formData,
// 		success: function () {
// 			// 刷新页面
// 			location.reload();
// 		},
// 		error: function () {
// 			alert('用户添加失败')
// 		}
// 	})
// 	// 阻止表单的默认提交行为
// 	return false;
// });

// 当表单发生提交行为的时候
function serializeObj(form) {
    var arr = form.serializeArray()
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })

    return obj;
}


$('#userForm').on('submit', function () {
    var obj = serializeObj($(this));
    console.log(obj);
    //根据obj中是否有id 来判断是更新还是新增用户
    if (obj.id) {
        $.ajax({
            type: 'PUT',
            url: '/users/' + obj.id,
            data: obj,
            success: function (data) {
                loadUser()
            },
            error: function (err) {
                alert('用户修改失败')
            }
        })
        return false;
    } else {
        $.ajax({
            type: 'post',
            url: '/users',
            data: obj,
            success: function (data) {
                loadUser()
            },
            error: function (err) {
                alert('用户添加失败')
            }
        })
        return false;
    }

})
function loadUser() {
    //获取用户列表
    $.ajax({
        type: 'get',
        url: '/users',
        success: function (data) {
            console.log(data);
            //渲染模板
            var html = template('tpl-users', { users: data })
            $('#data-container').html(html)
        }
    })
}
//处理头像上传
$('#userForm').on('change', '#avatar', function () {
    var formData = new FormData();

    formData.append('avatar', this.files[0])

    //开始发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (resp) {
            console.log(resp);
            //实现头像预览功能
            $('#preview').attr('src', resp[0].avatar)
            $('#hiddenAvatar').val(resp[0].avatar)
            loadUser()
        }
    })
})
loadUser()

//修改用户
//通过事件委托为编辑按钮添加点击事件
$('#data-container').on('click', '.edit', function () {
    //获取被点击用户的id值
    var id = $(this).attr('data-id')
    console.log(id);
    //根据id获取用户详细的信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (data) {
            var html = template('tpl-modify', data)
            console.log(data);

            $('#userForm').html(html)

        }
    })
})
$('#data-container').on('click', '.del', function (e) {
    // 获取到即将要删除的用户id
    var id = $(this).data('id')
    // 如果管理员确认要删除用户
    console.log(id);

    if (confirm('您真的要删除用户吗')) {

        // 向服务器端端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                loadUser()
            }
        })
    }
});

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
$('#data-container').on('change', 'input:checkbox', function () {
    var allCheckbox = $('#data-container input:checkbox')
    var hasChecked = allCheckbox.filter(':checked').length;
    if (hasChecked > 0) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
    var checkAll = allCheckbox.length === hasChecked;
    $('#selectAll').prop('checked', checkAll)
})
//全选相关代码
$('#selectAll').on('change', function () {
    var isChecked = this.checked;
    var deleteMany = $('#deleteMany')

    if (isChecked) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    $('#data-container').find('input:checkbox').prop('checked', isChecked)
})
$('#deleteMany').on('click', function () {
    var hasChecked = $('#data-container').find('input').filter(':checked');
    console.log(hasChecked);
    
    var arr = hasChecked.toArray().map(x => $(x).data('id'))
    console.log(arr);
    
    if (confirm('您真的要批量删除用户吗')) {
        $.ajax({
            url: '/users/' + arr.join('-'),
            type: 'delete',
            success: function () {
                loadUser()
            }
        })
    }
})