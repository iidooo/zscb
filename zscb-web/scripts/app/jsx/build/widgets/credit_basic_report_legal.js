var ReportLegal = React.createClass({displayName: "ReportLegal",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "八、预警信息"), 
                React.createElement("h4", {className: "sub-title"}, "1、司法信息"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportLegalSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportLegalMate, null)
                    )
                ), 

                React.createElement("h4", {className: "sub-title"}, "2、黑名单"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportBlackListSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportBlackListMate, null)
                    )
                )
            )
        );
    }
});

var ReportLegalSelfActions = Reflux.createActions(['getLegalInfo']);
var ReportLegalSelfStore = Reflux.createStore({
    listenables: [ReportLegalSelfActions],
    onGetLegalInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getLegalInfo;

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
var ReportLegalSelf = React.createClass({displayName: "ReportLegalSelf",
    mixins: [Reflux.connect(ReportLegalSelfStore, 'legal')],
    getInitialState: function () {
        return {
            legal: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportLegalSelfActions.getLegalInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "裁判文书"), 
                    React.createElement("td", {colSpan: "3", className: "col-xs-9"}, this.state.legal.judgeDoc)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "执行信息"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.executiveInfo)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "失信信息"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.creditInfo)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "开庭公告"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.courtAnnounce)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "送达公告"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.serviceAnnounce)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "审判流程公开"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.judgeProcess)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "破产与清算信息"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.liquidationInfo)
                )
                )
            )
        );
    }
});

var ReportLegalMateActions = Reflux.createActions(['getLegalInfo']);
var ReportLegalMateStore = Reflux.createStore({
    listenables: [ReportLegalMateActions],
    onGetLegalInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getLegalInfo;

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
var ReportLegalMate = React.createClass({displayName: "ReportLegalMate",
    mixins: [Reflux.connect(ReportLegalMateStore, 'legal')],
    getInitialState: function () {
        return {
            legal: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportLegalMateActions.getLegalInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "裁判文书"), 
                    React.createElement("td", {colSpan: "3", className: "col-xs-9"}, this.state.legal.judgeDoc)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "执行信息"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.executiveInfo)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "失信信息"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.creditInfo)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "开庭公告"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.courtAnnounce)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "送达公告"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.serviceAnnounce)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "审判流程公开"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.judgeProcess)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "破产与清算信息"), 
                    React.createElement("td", {colSpan: "3"}, this.state.legal.liquidationInfo)
                )
                )
            )
        );
    }
});


var ReportBlackListSelf = React.createClass({displayName: "ReportBlackListSelf",
    mixins: [Reflux.connect(ReportLegalSelfStore, 'legal')],
    getInitialState: function () {
        return {
            legal: {
                blackList: []
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                this.state.legal.blackList.map(function (item, index) {
                    return React.createElement(ReportBlackListItemSelf, {key: item.blackID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportBlackListItemSelf = React.createClass({displayName: "ReportBlackListItemSelf",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("th", {className: "col-xs-3"}, "详情"), 
                React.createElement("td", {className: "col-xs-9", colSpan: "3"}, this.props.item.detail)
            )
        );
    }
});

var ReportBlackListMate = React.createClass({displayName: "ReportBlackListMate",
    mixins: [Reflux.connect(ReportLegalMateStore, 'legal')],
    getInitialState: function () {
        return {
            legal: {
                blackList: []
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                this.state.legal.blackList.map(function (item, index) {
                    return React.createElement(ReportBlackListItemMate, {key: item.blackID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportBlackListItemMate = React.createClass({displayName: "ReportBlackListItemMate",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("th", {className: "col-xs-3"}, "详情"), 
                React.createElement("td", {className: "col-xs-9", colSpan: "3"}, this.props.item.detail)
            )
        );
    }
});