var SearchHistoryActions = Reflux.createActions(['getIdentityList']);

var SearchHistoryStore = Reflux.createStore({
    listenables: [SearchHistoryActions],
    onGetIdentityList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIdentityList;

        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.dataSource = "dolphin";

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

var SearchHistory = React.createClass({displayName: "SearchHistory",
    mixins: [Reflux.connect(SearchHistoryStore, 'identityData')],
    getInitialState: function () {
        return {
            identityData: {
                page: {},
                identityList: []
            }
        };
    },
    componentDidMount: function () {
        SearchHistoryActions.getIdentityList(this.state);
    },
    onChildChanged: function (childState) {
        if (childState.currentPage != null) {
            this.state.currentPage = childState.currentPage;

            SearchHistoryActions.searchSiteUserList(this.state);
        }
    },
    handleSearch: function () {
        this.state.loginID = this.refs.inputLoginID.value;
        this.state.userName = this.refs.inputUserName.value;
        this.state.sex = this.refs.inputSex.value;
        this.state.mobile = this.refs.inputMobile.value;
        this.state.email = this.refs.inputEmail.value;
        this.state.weixinID = this.refs.inputWeixinID.value;
        SearchHistoryActions.searchSiteUserList(this.state);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuDolphinCreditSearchHistory"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement("ol", {className: "breadcrumb"}, 
                            React.createElement("li", null, React.createElement("a", {href: "#"}, "系统管理")), 
                            React.createElement("li", null, React.createElement("a", {href: "#"}, "海豚")), 
                            React.createElement("li", {className: "active"}, "资信查询历史")
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
                                        React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.handleSearch}, 
                                            "查 询"
                                        )
                                    )
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
                    React.createElement("th", null, "借款人姓名"), 
                    React.createElement("th", null, "借款人证件号"), 
                    React.createElement("th", null, "配偶姓名"), 
                    React.createElement("th", null, "配偶证件号"), 
                    React.createElement("th", null, "查询时间"), 
                    React.createElement("th", null, "操作")
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
    handleLink: function (selfIDNumber, mateIDNumber) {
        console.log(selfIDNumber);
        console.log(mateIDNumber);
        sessionStorage.setItem(SessionKey.selfIDNumber, selfIDNumber);
        sessionStorage.setItem(SessionKey.mateIDNumber, mateIDNumber);
        location.href = SiteProperties.webURL + Page.dolphinCreditReport;
    },
    render: function () {
        var mateName = "";
        if (this.props.identity.mate != null && this.props.identity.mate.name != null) {
            mateName = this.props.identity.mate.name;
        }

        var mateIDNumber = "";
        if (this.props.identity.mate != null && this.props.identity.mate.idnumber != null) {
            mateIDNumber = this.props.identity.mate.idnumber;
        }
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, this.props.identity.name), 
                React.createElement("td", null, this.props.identity.idnumber), 
                React.createElement("td", null, mateName), 
                React.createElement("td", null, mateIDNumber), 
                React.createElement("td", null, new Date(this.props.identity.createTime).format('yyyy-MM-dd hh:mm:ss')), 
                React.createElement("td", null, 
                    React.createElement("a", {href: "javascript:void(0)", 
                       onClick: this.handleLink.bind(null, this.props.identity.idnumber, mateIDNumber)}, "查看报告")
                )
            )
        );
    }
});

ReactDOM.render(
    React.createElement(SearchHistory, null),
    document.getElementById('page')
);