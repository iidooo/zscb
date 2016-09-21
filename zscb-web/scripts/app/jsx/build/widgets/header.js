var Header = React.createClass({displayName: "Header",
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
            React.createElement("nav", {className: "navbar navbar-fixed-top", role: "navigation"}, 
                React.createElement("div", {className: "navbar-inner"}, 
                    React.createElement("div", {className: "navbar-header width-240"}, 
                        React.createElement("div", {className: "navbar-brand"}
                            
                                //<img src="../img/zslogo.png" style={{height:"38px",marginTop:"-8px"}}></img>
                            
                        )
                    ), 
                    React.createElement("div", {id: "navbar", className: "navbar-collapse collapse"}, 
                        React.createElement(MainMenu, {activeMenuID: this.props.activeMenuID}), 
                        React.createElement(LoginInfo, {userName: this.state.user.userName})
                    )
                )
            )
        );
    }
});


var MainMenu = React.createClass({displayName: "MainMenu",
    componentDidMount: function () {
        var activeMenuID = this.props.activeMenuID;
        $("#" + activeMenuID).addClass("active");
    },
    render: function () {
        return (
            React.createElement("ul", {className: "nav navbar-nav"}, 
                React.createElement("li", {id: "mainMenuSysManage"}, 
                    React.createElement("a", {href: SiteProperties.webURL + Page.systemManage}, "系统管理")
                ), 
                React.createElement("li", {id: "mainMenuBussinessManage"}, 
                    React.createElement("a", {href: SiteProperties.webURL + Page.creditSearch}, "征信业务")
                )
            )
        );
    }
});

var LoginInfo = React.createClass({displayName: "LoginInfo",
    handleLogout: function () {
        sessionStorage.removeItem(SessionKey.accessToken);
        sessionStorage.removeItem(SessionKey.operatorID);
        location.href = SiteProperties.webURL + Page.login;
    },

    render: function () {
        return (
            React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
                React.createElement("li", {className: "dropdown"}, 
                    React.createElement("a", {href: "javascript:void(0)", className: "dropdown-toggle", "data-toggle": "dropdown"}, 
                        React.createElement("span", null, "您好，", this.props.userName, "   "), 
                        React.createElement("i", {className: "fa fa-cog"})
                    ), 
                    React.createElement("ul", {className: "dropdown-menu"}, 
                        React.createElement("li", null, 
                            React.createElement("a", {href: SiteProperties.webURL + Page.profile}, React.createElement("i", {className: "fa fa-user"}), "  个人信息")
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: SiteProperties.webURL + Page.password}, React.createElement("i", {className: "fa fa-pencil"}), "  密码修改")
                        ), 
                        
                            //<li><a href="/pricing"><i className="fa fa-clipboard"></i>&nbsp;&nbsp;Plans</a></li>
                            //<li><a href="/docs"><i className="fa fa-files-o"></i>&nbsp;&nbsp;Documentation</a></li>
                        
                        React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", onClick: this.handleLogout}, React.createElement("i", {
                            className: "fa fa-power-off"}), "  注销"))
                    )
                )
            )
        );
    }
});