/**
 * Created by Ethan on 16/9/19.
 */
var ReportBussiness = React.createClass({displayName: "ReportBussiness",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "四、经营状况"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportBussinessSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportBussinessMate, null)
                    )
                )
            )
        );
    }
});

var ReportBussinessSelfActions = Reflux.createActions(['getBussinessList']);
var ReportBussinessSelfStore = Reflux.createStore({
    listenables: [ReportBussinessSelfActions],
    onGetBussinessList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getBussinessList;

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
    },
});
var ReportBussinessSelf = React.createClass({displayName: "ReportBussinessSelf",
    mixins: [Reflux.connect(ReportBussinessSelfStore, 'bussinessList')],
    getInitialState: function () {
        return {
            bussinessList: []
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportBussinessSelfActions.getBussinessList(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                this.state.bussinessList.map(function (item, index) {
                    return React.createElement(ReportBussinessItemSelf, {key: item.bussinessID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportBussinessItemSelf = React.createClass({displayName: "ReportBussinessItemSelf",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("th", {className: "col-xs-3"}, "关联平台名称 ", this.props.index + 1), 
                React.createElement("td", {className: "col-xs-3"}, this.props.item.plantform), 
                React.createElement("th", {className: "col-xs-3"}, "状态"), 
                React.createElement("td", {className: "col-xs-3"}, this.props.item.status)
            )
        );
    }
});

var ReportBussinessMateActions = Reflux.createActions(['getBussinessList']);
var ReportBussinessMateStore = Reflux.createStore({
    listenables: [ReportBussinessMateActions],
    onGetBussinessList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getBussinessList;

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
    },
});
var ReportBussinessMate = React.createClass({displayName: "ReportBussinessMate",
    mixins: [Reflux.connect(ReportBussinessMateStore, 'bussinessList')],
    getInitialState: function () {
        return {
            bussinessList: []
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportBussinessMateActions.getBussinessList(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                this.state.bussinessList.map(function (item, index) {
                    return React.createElement(ReportBussinessItemMate, {key: item.bussinessID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportBussinessItemMate = React.createClass({displayName: "ReportBussinessItemMate",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("th", {className: "col-xs-3"}, "关联平台名称 ", this.props.index + 1), 
                React.createElement("td", {className: "col-xs-3"}, this.props.item.plantform), 
                React.createElement("th", {className: "col-xs-3"}, "状态"), 
                React.createElement("td", {className: "col-xs-3"}, this.props.item.status)
            )
        );
    }
});