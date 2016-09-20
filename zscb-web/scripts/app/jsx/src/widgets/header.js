var Header = React.createClass({
    getInitialState: function () {
        return {
            user: {}
        };
    },
    componentWillMount: function () {
        this.state.user = JSON.parse(sessionStorage.getItem(SessionKey.user));
        if(this.state.user == null){
            location.href = SiteProperties.webURL + Page.login;
        }
    },
    render: function () {
        return (
            <nav className="navbar navbar-fixed-top" role="navigation">
                <div className="navbar-inner">
                    <div className="navbar-header width-240">
                        <div className="navbar-brand">
                            <img src="../img/zslogo.png" style={{height:"38px",marginTop:"-8px"}}></img>
                        </div>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <MainMenu activeMenuID={this.props.activeMenuID}/>
                        <LoginInfo userName={this.state.user.userName}/>
                    </div>
                </div>
            </nav>
        );
    }
});


var MainMenu = React.createClass({
    componentDidMount: function () {
        var activeMenuID = this.props.activeMenuID;
        $("#" + activeMenuID).addClass("active");
    },
    render: function () {
        return (
            <ul className="nav navbar-nav">
                <li id="mainMenuSysManage">
                    <a href={SiteProperties.webURL + Page.systemManage}>系统管理</a>
                </li>
                <li id="mainMenuBussinessManage">
                    <a href={SiteProperties.webURL + Page.creditSearch}>征信业务</a>
                </li>
            </ul>
        );
    }
});

var LoginInfo = React.createClass({
    handleLogout: function () {
        sessionStorage.removeItem(SessionKey.accessToken);
        sessionStorage.removeItem(SessionKey.operatorID);
        location.href = SiteProperties.webURL + Page.login;
    },

    render: function () {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                        <span>您好，{this.props.userName}&nbsp;&nbsp;&nbsp;</span>
                        <i className="fa fa-cog"></i>
                    </a>
                    <ul className="dropdown-menu">
                        <li>
                            <a href={SiteProperties.clientURL + Page.profile}><i className="fa fa-user"></i>&nbsp;&nbsp;个人信息</a>
                        </li>
                        <li>
                            <a href={SiteProperties.clientURL + Page.password}><i className="fa fa-pencil"></i>&nbsp;&nbsp;密码修改</a>
                        </li>
                        {
                            //<li><a href="/pricing"><i className="fa fa-clipboard"></i>&nbsp;&nbsp;Plans</a></li>
                            //<li><a href="/docs"><i className="fa fa-files-o"></i>&nbsp;&nbsp;Documentation</a></li>
                        }
                        <li><a href="javascript:void(0)" onClick={this.handleLogout}><i
                            className="fa fa-power-off"></i>&nbsp;&nbsp;注销</a></li>
                    </ul>
                </li>
            </ul>
        );
    }
});