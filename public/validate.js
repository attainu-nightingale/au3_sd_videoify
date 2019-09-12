$("#btn").on("click", function () {
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    var securityA = $("#qn").val();
    var securityQ = $("#ans").val();
    var uName = $("#uname").val();
    var Gender = $("#gender").val();
    var data = {
        email: $("#email").val(),
        username: $("#uname").val()
    }
    if (password1 != password2) {
        alert("password and confirm password does not match");
    }
    else if (password1.length < 8) {
        alert("password should be of minimum 8 character");
    }
    else if (securityA == "" && securityQ == "") {
        alert("please fill the security question and answer field")
    }
    else if (uName == "") {
        alert("please fill the UserName field")
    }
    else if (Gender == "Choose Gender...") {
        alert("please choose any Gender")
    }

    
    else {


        $.ajax({
            type: "POST",
            url: "/authrouter/validation",
            data: data,
            dataType: "JSON",
            success: function (data) {
                if (data == "11") {
                    alert("userrname and email already exists")
                }
                else if (data == "5") {
                    alert(" email already exists")
                }
                else if (data == "4") {
                    alert(" username already exists")
                }
                else {
                    var signup = {
                        firstName: $("#fname").val(),
                        lastName: $("#lname").val(),
                        gender: $("#gender").val(),
                        email: $("#email").val(),
                        userName: $("#uname").val(),
                        password: $("#password1").val(),
                        securityQ: $("#qn").val(),
                        securityA: $("#ans").val()
                    }

                    $.ajax({
                        type: "POST",
                        url: "/authrouter/adduser",
                        data: signup,
                        dataType: "JSON",
                        success: function (data) {

                        }

                    })
                    window.location.replace("/")
                }
            }
        });
    }
})

