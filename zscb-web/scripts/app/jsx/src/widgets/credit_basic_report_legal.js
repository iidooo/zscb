var ReportLegal = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">八、预警信息</h3>
                <h4 className="sub-title">1、司法信息</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportLegalSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportLegalMate/>
                    </div>
                </div>

                <h4 className="sub-title">2、黑名单</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportBlackListSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportBlackListMate/>
                    </div>
                </div>
            </div>
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
var ReportLegalSelf = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">裁判文书</th>
                    <td colSpan="3" className="col-xs-9">{this.state.legal.judgeDoc}</td>
                </tr>
                <tr>
                    <th>执行信息</th>
                    <td colSpan="3">{this.state.legal.executiveInfo}</td>
                </tr>
                <tr>
                    <th>失信信息</th>
                    <td colSpan="3">{this.state.legal.creditInfo}</td>
                </tr>
                <tr>
                    <th>开庭公告</th>
                    <td colSpan="3">{this.state.legal.courtAnnounce}</td>
                </tr>
                <tr>
                    <th>送达公告</th>
                    <td colSpan="3">{this.state.legal.serviceAnnounce}</td>
                </tr>
                <tr>
                    <th>审判流程公开</th>
                    <td colSpan="3">{this.state.legal.judgeProcess}</td>
                </tr>
                <tr>
                    <th>破产与清算信息</th>
                    <td colSpan="3">{this.state.legal.liquidationInfo}</td>
                </tr>
                </tbody>
            </table>
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
var ReportLegalMate = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">裁判文书</th>
                    <td colSpan="3" className="col-xs-9">{this.state.legal.judgeDoc}</td>
                </tr>
                <tr>
                    <th>执行信息</th>
                    <td colSpan="3">{this.state.legal.executiveInfo}</td>
                </tr>
                <tr>
                    <th>失信信息</th>
                    <td colSpan="3">{this.state.legal.creditInfo}</td>
                </tr>
                <tr>
                    <th>开庭公告</th>
                    <td colSpan="3">{this.state.legal.courtAnnounce}</td>
                </tr>
                <tr>
                    <th>送达公告</th>
                    <td colSpan="3">{this.state.legal.serviceAnnounce}</td>
                </tr>
                <tr>
                    <th>审判流程公开</th>
                    <td colSpan="3">{this.state.legal.judgeProcess}</td>
                </tr>
                <tr>
                    <th>破产与清算信息</th>
                    <td colSpan="3">{this.state.legal.liquidationInfo}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});


var ReportBlackListSelf = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                {this.state.legal.blackList.map(function (item, index) {
                    return <ReportBlackListItemSelf key={item.blackID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportBlackListItemSelf = React.createClass({
    render: function () {
        return (
            <tr>
                <th className="col-xs-3">详情</th>
                <td className="col-xs-9" colSpan="3">{this.props.item.detail}</td>
            </tr>
        );
    }
});

var ReportBlackListMate = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                {this.state.legal.blackList.map(function (item, index) {
                    return <ReportBlackListItemMate key={item.blackID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportBlackListItemMate = React.createClass({
    render: function () {
        return (
            <tr>
                <th className="col-xs-3">详情</th>
                <td className="col-xs-9" colSpan="3">{this.props.item.detail}</td>
            </tr>
        );
    }
});