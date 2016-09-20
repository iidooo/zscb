/**
 * Created by Ethan on 16/9/19.
 */

var ReportDebt = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">六、负债信息</h3>
                <h4 className="sub-title">1、人行征信</h4>
                <div className="row">
                    <div className="col-xs-6">
                        <ReportDebtSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportDebtMate/>
                    </div>
                </div>
            </div>
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
var ReportDebtSelf = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">住房贷款笔数</th>
                    <td className="col-xs-3">{this.state.debt.housingLoanNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.housingLoanAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">商用房贷款笔数</th>
                    <td className="col-xs-3">{this.state.debt.tradLoanNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.tradLoanAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">其他贷款笔数</th>
                    <td className="col-xs-3">{this.state.debt.otherLoanNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.otherLoanAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">贷记卡账户数</th>
                    <td className="col-xs-3">{this.state.debt.creditCardNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.creditCardAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">贷款逾期笔数</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanNum}</td>
                    <th className="col-xs-3">最长期数</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanNumTerm}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">贷记卡逾期账户</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanAccount}</td>
                    <th className="col-xs-3">最长期数</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanAccountTerm}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">对外担保笔数</th>
                    <td className="col-xs-3">{this.state.debt.guaranteeNum}</td>
                    <th className="col-xs-3">担保总额</th>
                    <td className="col-xs-3">{this.state.debt.guaranteeAmount}</td>
                </tr>
                <tr>
                    <th colSpan="2">贷款近6月平均应还款额</th>
                    <td colSpan="2">{this.state.debt.loanRepayAmount}</td>
                </tr>
                <tr>
                    <th colSpan="2">贷记卡近6月平均使用额度</th>
                    <td colSpan="2">{this.state.debt.creditUsedAmount}</td>
                </tr>
                <tr>
                    <th colSpan="2">准贷记卡近6月平均透支余额</th>
                    <td colSpan="2">{this.state.debt.creditOverdraftAmount}</td>
                </tr>
                </tbody>
            </table>
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
var ReportDebtMate = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">住房贷款笔数</th>
                    <td className="col-xs-3">{this.state.debt.housingLoanNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.housingLoanAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">商用房贷款笔数</th>
                    <td className="col-xs-3">{this.state.debt.tradLoanNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.tradLoanAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">其他贷款笔数</th>
                    <td className="col-xs-3">{this.state.debt.otherLoanNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.otherLoanAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">贷记卡账户数</th>
                    <td className="col-xs-3">{this.state.debt.creditCardNum}</td>
                    <th className="col-xs-3">授信总额</th>
                    <td className="col-xs-3">{this.state.debt.creditCardAmount}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">贷款逾期笔数</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanNum}</td>
                    <th className="col-xs-3">最长期数</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanNumTerm}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">贷记卡逾期账户</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanAccount}</td>
                    <th className="col-xs-3">最长期数</th>
                    <td className="col-xs-3">{this.state.debt.overdueLoanAccountTerm}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">对外担保笔数</th>
                    <td className="col-xs-3">{this.state.debt.guaranteeNum}</td>
                    <th className="col-xs-3">担保总额</th>
                    <td className="col-xs-3">{this.state.debt.guaranteeAmount}</td>
                </tr>
                <tr>
                    <th colSpan="2">贷款近6月平均应还款额</th>
                    <td colSpan="2">{this.state.debt.loanRepayAmount}</td>
                </tr>
                <tr>
                    <th colSpan="2">贷记卡近6月平均使用额度</th>
                    <td colSpan="2">{this.state.debt.creditUsedAmount}</td>
                </tr>
                <tr>
                    <th colSpan="2">准贷记卡近6月平均透支余额</th>
                    <td colSpan="2">{this.state.debt.creditOverdraftAmount}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});