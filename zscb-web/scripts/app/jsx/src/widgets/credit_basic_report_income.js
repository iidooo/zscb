var ReportIncome = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">七、收入信息</h3>
                <h4 className="sub-title">1、纳税信息</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportIncomeSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportIncomeMate/>
                    </div>
                </div>

                <h4 className="sub-title">2、主要银行卡</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportCardSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportCardMate/>
                    </div>
                </div>
            </div>
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
var ReportIncomeSelf = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位</th>
                    <td colSpan="3">{this.state.income.company}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">年纳税额</th>
                    <td className="col-xs-6" colSpan="2">{this.state.income.taxAmount}</td>
                    <td className="col-xs-3 text-center">详细</td>
                </tr>
                <tr>
                    <th>收入区间</th>
                    <td colSpan="3">{this.state.income.incomeRange}</td>
                </tr>
                </tbody>
            </table>
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
var ReportIncomeMate = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位</th>
                    <td colSpan="3">{this.state.income.company}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">年纳税额</th>
                    <td className="col-xs-6" colSpan="2">{this.state.income.taxAmount}</td>
                    <td className="col-xs-3 text-center">详细</td>
                </tr>
                <tr>
                    <th>收入区间</th>
                    <td colSpan="3">{this.state.income.incomeRange}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});


var ReportCardSelf = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                {this.state.income.cardList.map(function (item, index) {
                    return <ReportCardItemSelf key={item.cardID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportCardItemSelf = React.createClass({
    render: function () {
        return (
            <tr>
                <th className="col-xs-3">卡号 {this.props.index + 1}</th>
                <td className="col-xs-6" colSpan="2">{this.props.item.cardNo}</td>
                <td className="col-xs-3 text-center">详细</td>
            </tr>
        );
    }
});

var ReportCardMate = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                {this.state.income.cardList.map(function (item, index) {
                    return <ReportCardItemMate key={item.cardID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportCardItemMate = React.createClass({
    render: function () {
        return (
            <tr>
                <th className="col-xs-3">卡号 {this.props.index + 1}</th>
                <td className="col-xs-6" colSpan="2">{this.props.item.cardNo}</td>
                <td className="col-xs-3 text-center">详细</td>
            </tr>
        );
    }
});