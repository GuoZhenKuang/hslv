$(document).ready(function () {
    var bgSize = function () {
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        $("#content").css({ "height": screenHeight, "width": screenWidth });
    }
    bgSize();
    var judge = function () {
        if ($(".txtUserName").val() == "") {
            $(".errorTxt").html("用户名为空！");
            return;
        }
        if ($(".txtPassWord").val() == "") {
            $(".errorTxt").html("密码为空！");
            return;
        }
        if ($(".txtUserName").val().length < 8 || $(".txtPassWord").val().length > 16) {
            $(".errorTxt").html("用户名长度为8-16位！");
            return;
        }
        if ($(".txtPassWord").val().length < 8 || $(".txtPassWord").val().length > 16) {
            $(".errorTxt").html("密码长度为8-16位！");
            return;
        }
        var regularName=/^[a-zA-Z]([a-zA-Z0-9_]){7,15}$/;
        if(new RegExp(regularName).test($(".txtUserName").val())==false){
            $(".errorTxt").html("用户名必须由字母开头，可带数字、字母和下划线，长度在8-16之间");
            return;
        }
        var regularPassWord=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
        if(new RegExp(regularPassWord).test($(".txtPassWord").val())==false){
            $(".errorTxt").html("密码必须包含大小写字母和数字的组合，不使用特殊字符，长度在8-16之间");
            return;
        }
    }
    var judge2 = function () {
        if ($(".userName").val() == "") {
            $(".error").html("用户名为空！");
            return;
        }
        if ($(".passWord").val() == "") {
            $(".error").html("密码为空！");
            return;
        }
        if ($(".userName").val().length < 8 || $(".txtPassWord").val().length > 16) {
            $(".error").html("用户名长度为8-16位！");
            return;
        }
        if ($(".passWord").val().length < 8 || $(".txtPassWord").val().length > 16) {
            $(".error").html("密码长度为8-16位！");
            return;
        }
        var name=/^[a-zA-Z]([a-zA-Z0-9_]){7,15}$/;
        if(new RegExp(name).test($(".userName").val())==false){
            $(".error").html("用户名必须由字母开头，可带数字、字母和下划线，长度在8-16之间");
            return;
        }
        var passWord=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
        if(new RegExp(passWord).test($(".passWord").val())==false){
            $(".error").html("密码必须包含大小写字母和数字的组合，不使用特殊字符，长度在8-16之间");
            return;
        }
        if($(".passWordAgain").val()!=$(".passWord").val()){
            $(".error").html("密码不一致，请重新确认密码");
            return;
        }
    }

    $('#login_form').on('submit', function (e) {
        //judge();
        e.preventDefault()
        var formData = $(this).serialize()
        console.log(formData)
        $.ajax({
            url: '/login',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: function (data) {
                var err_code = data.err_code
                if (err_code === 0) {
                    //window.alert('登录成功！')
                    // 服务端重定向针对异步请求无效
                    window.location.href = '/'
                } else if (err_code === 1) {
                    window.alert('用户名或密码错误')
                } else if (err_code === 500) {
                    window.alert('服务器忙，请稍后重试！')
                }
            }
        })
    })
    
    $('#chang_form').on('submit', function (e) {
        //judge2();
        e.preventDefault()
        var formData = $(this).serialize()
        console.log(formData)
        $.ajax({
            url: '/login',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: function (data) {
                var err_code = data.err_code
                if (err_code === 0) {
                   // window.alert('修改成功！')
                    // 服务端重定向针对异步请求无效
                    window.location.href = '/'
                } else if (err_code === 1) {
                    window.alert('修改密码失败')
                } else if (err_code === 500) {
                    window.alert('服务器忙，请稍后重试！')
                }
            }
        })
    })

    $(window).resize(function () {
        bgSize();
    });

})



