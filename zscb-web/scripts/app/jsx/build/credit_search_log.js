var SearchLogActions = Reflux.createActions(['getIdentityList']);

var SearchLogStore = Reflux.createStore({
    listenables: [SearchLogActions],
    onGetIdentityList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIdentityList;

        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.webURL + Page.login;
            return false;
        }

        var self = this;
        var callback = function (result) {
            console.log(result.data);
            if (result.status == 200) {
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    }
});

var SearchLog = React.createClass({displayName: "SearchLog",
    mixins: [Reflux.connect(SearchLogStore, 'identityData')],
    getInitialState: function () {
        return {
            identityData: {
                page: {},
                identityList: []
            }
        };
    },
    componentDidMount: function () {
        SearchLogActions.getIdentityList(this.state);
    },
    onChildChanged: function (childState) {
        if (childState.currentPage != null) {
            this.state.currentPage = childState.currentPage;

            SearchLogActions.searchSiteUserList(this.state);
        }
    },
    handleSearch: function(){
        this.state.loginID = this.refs.inputLoginID.value;
        this.state.userName = this.refs.inputUserName.value;
        this.state.sex = this.refs.inputSex.value;
        this.state.mobile = this.refs.inputMobile.value;
        this.state.email = this.refs.inputEmail.value;
        this.state.weixinID = this.refs.inputWeixinID.value;
        SearchLogActions.searchSiteUserList(this.state);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuBussinessManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuBussinessManage", activeMenuID: "sideMenuCreditSearchLog"}), 
                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.creditSearchLog}), 

                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "查询条件"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "姓名")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", ref: "inputName"})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "身份证号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", ref: "inputIDNumber"})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "手机号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", ref: "inputMobile"})
                                        )
                                    )
                                ), 

                                React.createElement("div", {className: "text-right"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.handleSearch}, "查 询")
                                )
                            )
                        ), 

                        React.createElement(IdentityDataTable, {identityList: this.state.identityData.identityList}), 

                        React.createElement(Pager, {callbackParent: this.onChildChanged, 
                               recordSum: this.state.identityData.page.recordSum, 
                               currentPage: this.state.identityData.page.currentPage, 
                               pageSum: this.state.identityData.page.pageSum}), 

                        React.createElement(Footer, null)
                    )
                )

            )
        );
    }
});

var IdentityDataTable = React.createClass({displayName: "IdentityDataTable",
    render: function () {
        return (
            React.createElement("table", {className: "table table-hover"}, 
                React.createElement("thead", null, 
                React.createElement("tr", null, 
                    React.createElement("th", null, "操作员"), 
                    React.createElement("th", null, "操作时间"), 
                    React.createElement("th", null, "姓名"), 
                    React.createElement("th", null, "证件号"), 
                    React.createElement("th", null, "手机号")
                )
                ), 
                React.createElement("tbody", null, 
                this.props.identityList.map(function (item) {
                    return React.createElement(IdentityTableRow, {key: item.identityID, identity: item})
                })
                )
            )
        );
    }
});

var IdentityTableRow = React.createClass({displayName: "IdentityTableRow",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, this.props.identity.createUser.userName), 
                React.createElement("td", null, new Date(this.props.identity.createTime).format('yyyy-MM-dd hh:mm:ss')), 
                React.createElement("td", null, this.props.identity.name), 
                React.createElement("td", null, this.props.identity.idnumber), 
                React.createElement("td", null, this.props.identity.mobile)
            )
        );
    }
});

ReactDOM.render(
    React.createElement(SearchLog, null),
    document.getElementById('page')
);