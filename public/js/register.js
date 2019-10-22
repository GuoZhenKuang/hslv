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
            return false;
        }
        if ($(".txtPassWord").val() == "") {
            $(".errorTxt").html("密码为空！");
            return false;
        }
        if ($(".txtPassWordAgain").val() == "") {
            $(".errorTxt").html("确定密码为空！");
            return false;
        }
        if ($(".txtUserName").val().length < 3 || $(".txtPassWord").val().length > 16) {
            $(".errorTxt").html("用户名长度为3-16位！");
            return false;
        }
        if ($(".txtPassWord").val().length < 3 || $(".txtPassWord").val().length > 16) {
            $(".errorTxt").html("密码长度为3-16位！");
            return false;
        }
        var regularName=/^[a-zA-Z]([a-zA-Z0-9_]){7,15}$/;
        if(new RegExp(regularName).test($(".txtUserName").val())==false){
            $(".errorTxt").html("用户名必须由字母开头，可带数字、字母和下划线，长度在8-16之间");
            return false;
        }
        var regularPassWord=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
        if(new RegExp(regularPassWord).test($(".txtPassWord").val())==false){
            $(".errorTxt").html("密码必须包含大小写字母和数字的组合，不使用特殊字符，长度在8-16之间");
            return false;
        }
        if ($(".txtPassWordAgain").val() != $(".txtPassWord").val()) {
            $(".errorTxt").html("密码不一致！请再次确定您的密码");
            return false;
        }
    }
    $('#register_form').on('submit', function (e) {
            e.preventDefault()
            var formData = $(this).serialize()
            $.ajax({
              url: '/register',
              type: 'post',
              data: formData,
              dataType: 'json',
              success: function (data) {
                var err_code = data.err_code
                if (err_code === 0) {
                  window.alert('注册成功！')
                  // 服务端重定向针对异步请求无效
                  //window.location.href = '/login'
                } else if (err_code === 1) {
                  window.alert('用户名已存在！')
                } else if (err_code === 500) {
                  window.alert('服务器忙，请稍后重试！')
                }
              }
            }) 
      })
    $(window).resize(function () {
        bgSize();
    })
})

