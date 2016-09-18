var LoginActions = Reflux.createActions(['login']);

var LoginStore = Reflux.createStore({

    listenables: [LoginActions],

    onLogin: function (data) {
        //var url = SiteProperties.serverURL + API.loginByEmail;
        //data.accessKey = SecurityClient.accessKey;
        //data.accessSecret = SecurityClient.accessSecret;
        //
        //var callback = function (result) {
        //    if (result.status == 200) {
        //        sessionStorage.setItem(SessionKey.accessToken, result.data.token);
        //        sessionStorage.setItem(SessionKey.operatorID, result.data.userID);
        //        // 用户信息用的地方比较多，以json格式存储进sessionStorage
        //        sessionStorage.setItem(SessionKey.user, JSON.stringify(result.data.user));
                location.href = SiteProperties.webURL + Page.systemManage;
        //    } else {
        //        var message = Message.LOGIN_FAILED;
        //        $("#messageBox").show().text(message);
        //    }
        //};
        //
        //ajaxPost(url, data, callback);
    }
});

var Login = React.createClass({displayName: "Login",
    componentDidMount(){
        $.backstretch("../img/bg/loginBg.jpg");
    },
    render: function () {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("h1", {id: "logoWrap", className: "text-center"}, 
                    React.createElement("img", {src: "../img/zslogoB.png"})
                ), 
                React.createElement("h2", {id: "loginTitle", className: "text-center"}, "个人审贷资信验证平台"), 
                React.createElement(LoginForm, null)
            )
        );
    }
});


var LoginForm = React.createClass({displayName: "LoginForm",
    getInitialState: function () {
        return {
            loginID: "",
            password: ""
        }
    },
    handleLogin: function () {
        this.state.loginID = this.refs.inputLoginID.value;
        this.state.password = this.refs.inputPassword.value;
        if(this.state.loginID == "" || this.state.password == ""){
            alert(Message.LOGIN_INFO_REQUIRED);
            return;
        }
        LoginActions.login(this.state);
    },
    render: function () {
        return (
            React.createElement("div", {id: "loginForm"}, 
                React.createElement(MessageBox, null), 
                React.createElement("div", {className: "loginFrame"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", null, "用户名"), 
                        React.createElement("input", {ref: "inputLoginID", type: "text", placeholder: "请输入用户名", className: "form-control input-lg"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", null, "密码"), 

                        React.createElement("div", {className: "pull-right"}, 
                            React.createElement("a", {href: "#"}, "忘记密码？")
                        ), 
                        React.createElement("input", {ref: "inputPassword", type: "password", placeholder: "请输入密码", 
                               className: "form-control input-lg"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("button", {type: "button", className: "btn btn-primary btn-lg btn-block", onClick: this.handleLogin}, 
                            "登录"
                        )
                    )
                ), 
                React.createElement(Footer, null)
            )
        );
    }
});

ReactDOM.render(
    React.createElement(Login, null),
    document.getElementById('page')
);

