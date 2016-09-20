var ReportIncome = React.createClass({displayName: "ReportIncome",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "七、收入信息"), 
                React.createElement("h4", {className: "sub-title"}, "1、纳税信息"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportIncomeSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportIncomeMate, null)
                    )
                ), 

                React.createElement("h4", {className: "sub-title"}, "2、主要银行卡"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportCardSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportCardMate, null)
                    )
                )
            )
        );
    }
});

var ReportIncomeSelfActions = Reflux.createActions(['getIncomeInfo']);
var ReportIncomeSelfStore = Reflux.createStore({
    listenables: [ReportIncomeSelfActions],
    onGetIncomeInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIncomeInfo;

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
var ReportIncomeSelf = React.createClass({displayName: "ReportIncomeSelf",
    mixins: [Reflux.connect(ReportIncomeSelfStore, 'income')],
    getInitialState: function () {
        return {
            income: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportIncomeSelfActions.getIncomeInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位"), 
                    React.createElement("td", {colSpan: "3"}, this.state.income.company)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "年纳税额"), 
                    React.createElement("td", {className: "col-xs-6", colSpan: "2"}, this.state.income.taxAmount), 
                    React.createElement("td", {className: "col-xs-3 text-center"}, "详细")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "收入区间"), 
                    React.createElement("td", {colSpan: "3"}, this.state.income.incomeRange)
                )
                )
            )
        );
    }
});

var ReportIncomeMateActions = Reflux.createActions(['getIncomeInfo']);
var ReportIncomeMateStore = Reflux.createStore({
    listenables: [ReportIncomeMateActions],
    onGetIncomeInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIncomeInfo;

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
var ReportIncomeMate = React.createClass({displayName: "ReportIncomeMate",
    mixins: [Reflux.connect(ReportIncomeMateStore, 'income')],
    getInitialState: function () {
        return {
            income: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportIncomeMateActions.getIncomeInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位"), 
                    React.createElement("td", {colSpan: "3"}, this.state.income.company)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "年纳税额"), 
                    React.createElement("td", {className: "col-xs-6", colSpan: "2"}, this.state.income.taxAmount), 
                    React.createElement("td", {className: "col-xs-3 text-center"}, "详细")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "收入区间"), 
                    React.createElement("td", {colSpan: "3"}, this.state.income.incomeRange)
                )
                )
            )
        );
    }
});


var ReportCardSelf = React.createClass({displayName: "ReportCardSelf",
    mixins: [Reflux.connect(ReportIncomeSelfStore, 'income')],
    getInitialState: function () {
        return {
            income: {
                cardList: []
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
                this.state.income.cardList.map(function (item, index) {
                    return React.createElement(ReportCardItemSelf, {key: item.cardID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportCardItemSelf = React.createClass({displayName: "ReportCardItemSelf",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("th", {className: "col-xs-3"}, "卡号 ", this.props.index + 1), 
                React.createElement("td", {className: "col-xs-6", colSpan: "2"}, this.props.item.cardNo), 
                React.createElement("td", {className: "col-xs-3 text-center"}, "详细")
            )
        );
    }
});

var ReportCardMate = React.createClass({displayName: "ReportCardMate",
    mixins: [Reflux.connect(ReportIncomeMateStore, 'income')],
    getInitialState: function () {
        return {
            income: {
                cardList: []
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
                this.state.income.cardList.map(function (item, index) {
                    return React.createElement(ReportCardItemMate, {key: item.cardID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportCardItemMate = React.createClass({displayName: "ReportCardItemMate",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("th", {className: "col-xs-3"}, "卡号 ", this.props.index + 1), 
                React.createElement("td", {className: "col-xs-6", colSpan: "2"}, this.props.item.cardNo), 
                React.createElement("td", {className: "col-xs-3 text-center"}, "详细")
            )
        );
    }
});