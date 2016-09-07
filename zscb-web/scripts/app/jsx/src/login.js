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
                location.href = SiteProperties.webURL + Page.bigdAccountInfo;
        //    } else {
        //        var message = Message.LOGIN_FAILED;
        //        $("#messageBox").show().text(message);
        //    }
        //};
        //
        //ajaxPost(url, data, callback);
    }
});

var Login = React.createClass({
    componentDidMount(){
        $.backstretch("../img/bg/loginBg.jpg");
    },
    render: function () {
        return (
            <div className="container">
                <h1 id="logoWrap" className="text-center">
                    <img src="../img/zslogoB.png"></img>
                </h1>
                <h2 id="loginTitle" className="text-center">个人审贷资信验证平台</h2>
                <LoginForm/>
            </div>
        );
    }
});


var LoginForm = React.createClass({
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
            <div id="loginForm">
                <MessageBox/>
                <div className="loginFrame">
                    <div className="form-group">
                        <label>用户名</label>
                        <input ref="inputLoginID" type="text" placeholder="请输入用户名" className="form-control input-lg"/>
                    </div>
                    <div className="form-group">
                        <label>密码</label>

                        <div className="pull-right">
                            <a href="#">忘记密码？</a>
                        </div>
                        <input ref="inputPassword" type="password" placeholder="请输入密码"
                               className="form-control input-lg"/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleLogin}>
                            登录
                        </button>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
});

ReactDOM.render(
    <Login/>,
    document.getElementById('page')
);

