var PageActions = Reflux.createActions(['getPersonalHouseMate']);

var PageStore = Reflux.createStore({
    listenables: [PageActions],
    getPersonalHouseMate: function (data) {
        var url = SiteProperties.serverURL + WescrAPI.getPersonalHouseMate;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.webURL + Page.login;
            return false;
        }

        var self = this;
        var callback = function (result) {


            if (result.status == 200) {
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    }
});

var PageContent = React.createClass({displayName: "PageContent",
    mixins: [Reflux.connect(PageStore, 'personalHouseMate')],
    getInitialState: function () {
        return {
            idNumber: "33020619730129061X",
            name: "王旭军",
            personalHouseMate: ""
        };
    },
    handleChange: function (name, event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    },
    handleSearch: function () {
        this.setState({personalHouseMate: ""});
        PageActions.getPersonalHouseMate(this.state);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuWescrPersonalHouseMate"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement("ol", {className: "breadcrumb"}, 
                            React.createElement("li", null, React.createElement("a", {href: "#"}, "系统管理")), 
                            React.createElement("li", null, React.createElement("a", {href: "#"}, "维氏盾")), 
                            React.createElement("li", {className: "active"}, "个人户籍及同住人信息")
                        ), 
                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "查询条件"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "姓名")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.name, 
                                                   onChange: this.handleChange.bind(this,"name")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "身份证号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.idNumber, 
                                                   onChange: this.handleChange.bind(this,"idNumber")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.handleSearch}, 
                                            "查询"
                                        )
                                    )
                                )
                            )
                        ), 
                        React.createElement(SearchResult, {personalHouseMate: this.state.personalHouseMate}), 
                        React.createElement(Footer, null)

                    )
                )

            )
        );
    }
});

var SearchResult = React.createClass({displayName: "SearchResult",
    getInitialState: function () {
        return {
            personalHouseMate: {}
        };
    },
    handleChange: function (event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    },
    render: function () {
        return (

            React.createElement("div", {className: "panel panel-info"}, 
                React.createElement("div", {className: "panel-heading"}, "查询结果"), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("textarea", {className: "form-control", rows: "10", value: this.props.personalHouseMate, 
                              onChange: this.handleChange.bind(this,"personalHouseMate")})
                )
            )
        );
    }
});

ReactDOM.render(
    React.createElement(PageContent, null),
    document.getElementById('page')
);