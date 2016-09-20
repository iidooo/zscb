/**
 * Created by Ethan on 16/9/19.
 */

var ReportDebt = React.createClass({displayName: "ReportDebt",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "六、负债信息"), 
                React.createElement("h4", {className: "sub-title"}, "1、人行征信"), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportDebtSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportDebtMate, null)
                    )
                )
            )
        );
    }
});

var ReportDebtSelfActions = Reflux.createActions(['getDebtInfo']);
var ReportDebtSelfStore = Reflux.createStore({
    listenables: [ReportDebtSelfActions],
    onGetDebtInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getDebtInfo;

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
var ReportDebtSelf = React.createClass({displayName: "ReportDebtSelf",
    mixins: [Reflux.connect(ReportDebtSelfStore, 'debt')],
    getInitialState: function () {
        return {
            debt: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportDebtSelfActions.getDebtInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "住房贷款笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.housingLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.housingLoanAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "商用房贷款笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.tradLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.tradLoanAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "其他贷款笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.otherLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.otherLoanAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "贷记卡账户数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.creditCardNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.creditCardAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "贷款逾期笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "最长期数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanNumTerm)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "贷记卡逾期账户"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanAccount), 
                    React.createElement("th", {className: "col-xs-3"}, "最长期数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanAccountTerm)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "对外担保笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.guaranteeNum), 
                    React.createElement("th", {className: "col-xs-3"}, "担保总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.guaranteeAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "2"}, "贷款近6月平均应还款额"), 
                    React.createElement("td", {colSpan: "2"}, this.state.debt.loanRepayAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "2"}, "贷记卡近6月平均使用额度"), 
                    React.createElement("td", {colSpan: "2"}, this.state.debt.creditUsedAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "2"}, "准贷记卡近6月平均透支余额"), 
                    React.createElement("td", {colSpan: "2"}, this.state.debt.creditOverdraftAmount)
                )
                )
            )
        );
    }
});

var ReportDebtMateActions = Reflux.createActions(['getDebtInfo']);
var ReportDebtMateStore = Reflux.createStore({
    listenables: [ReportDebtMateActions],
    onGetDebtInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getDebtInfo;

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
})
var ReportDebtMate = React.createClass({displayName: "ReportDebtMate",
    mixins: [Reflux.connect(ReportDebtMateStore, 'debt')],
    getInitialState: function () {
        return {
            debt: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportDebtMateActions.getDebtInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "住房贷款笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.housingLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.housingLoanAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "商用房贷款笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.tradLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.tradLoanAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "其他贷款笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.otherLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.otherLoanAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "贷记卡账户数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.creditCardNum), 
                    React.createElement("th", {className: "col-xs-3"}, "授信总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.creditCardAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "贷款逾期笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanNum), 
                    React.createElement("th", {className: "col-xs-3"}, "最长期数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanNumTerm)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "贷记卡逾期账户"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanAccount), 
                    React.createElement("th", {className: "col-xs-3"}, "最长期数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.overdueLoanAccountTerm)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "对外担保笔数"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.guaranteeNum), 
                    React.createElement("th", {className: "col-xs-3"}, "担保总额"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.debt.guaranteeAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "2"}, "贷款近6月平均应还款额"), 
                    React.createElement("td", {colSpan: "2"}, this.state.debt.loanRepayAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "2"}, "贷记卡近6月平均使用额度"), 
                    React.createElement("td", {colSpan: "2"}, this.state.debt.creditUsedAmount)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "2"}, "准贷记卡近6月平均透支余额"), 
                    React.createElement("td", {colSpan: "2"}, this.state.debt.creditOverdraftAmount)
                )
                )
            )
        );
    }
});