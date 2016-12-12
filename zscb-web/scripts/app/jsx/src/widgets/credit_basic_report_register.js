/**
 * Created by Ethan on 16/9/19.
 */
var ReportRegister = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">二、婚姻信息</h3>
                <h4 className="sub-title">1、婚姻信息</h4>
                <div className="row">
                    <div className="col-xs-6">
                        <ReportMarriedSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportMarriedMate/>
                    </div>
                </div>
                <h4 className="sub-title">2、户籍信息</h4>
                <div className="row">
                    <div className="col-xs-6">
                        <ReportRegisterSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportRegisterMate/>
                    </div>
                </div>
            </div>
        );
    }
});

var ReportMarriedSelfActions = Reflux.createActions(['getRegisterInfo']);
var ReportMarriedSelfStore = Reflux.createStore({
    listenables: [ReportMarriedSelfActions],
    onGetRegisterInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getRegisterInfo;

        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.webURL + Page.login;
            return false;
        }

        console.log(data);
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
var ReportMarriedSelf = React.createClass({
    mixins: [Reflux.connect(ReportMarriedSelfStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    componentDidMount: function () {
        this.state.idNumber = sessionStorage.getItem(SessionKey.selfIDNumber);
        this.state.dataSource = sessionStorage.getItem(SessionKey.dataSource);
        ReportMarriedSelfActions.getRegisterInfo(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">婚姻</th>
                    <td colSpan="3" className="text-center">{this.state.register.marryStatus}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var ReportMarriedMateActions = Reflux.createActions(['getRegisterInfo']);
var ReportMarriedMateStore = Reflux.createStore({
    listenables: [ReportMarriedMateActions],
    onGetRegisterInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getRegisterInfo;

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
var ReportMarriedMate = React.createClass({
    mixins: [Reflux.connect(ReportMarriedMateStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    componentDidMount: function () {
        this.state.idNumber = sessionStorage.getItem(SessionKey.mateIDNumber);
        this.state.dataSource = sessionStorage.getItem(SessionKey.dataSource);
        ReportMarriedMateActions.getRegisterInfo(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">婚姻</th>
                    <td colSpan="3" className="text-center">{this.state.register.marryStatus}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var ReportRegisterSelf = React.createClass({
    mixins: [Reflux.connect(ReportMarriedSelfStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">户籍地址</th>
                    <td colSpan="3">{this.state.register.registerAddress}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">籍贯</th>
                    <td className="col-xs-3">{this.state.register.rootAddress}</td>
                    <th className="col-xs-3">出生地</th>
                    <td className="col-xs-3">{this.state.register.bornAddress}</td>
                </tr>
                <tr>
                    <th>婚姻</th>
                    <td>{this.state.register.marryStatus}</td>
                    <th>曾用名</th>
                    <td>{this.state.register.usedName}</td>
                </tr>
                <tr>
                    <th>同户人信息</th>
                    <td colSpan="3" className="text-center"><a href="javascript:void(0)">详细</a></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var ReportRegisterMate = React.createClass({
    mixins: [Reflux.connect(ReportMarriedMateStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">户籍地址</th>
                    <td colSpan="3">{this.state.register.registerAddress}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">籍贯</th>
                    <td className="col-xs-3">{this.state.register.rootAddress}</td>
                    <th className="col-xs-3">出生地</th>
                    <td className="col-xs-3">{this.state.register.bornAddress}</td>
                </tr>
                <tr>
                    <th>婚姻</th>
                    <td>{this.state.register.marryStatus}</td>
                    <th>曾用名</th>
                    <td>{this.state.register.usedName}</td>
                </tr>
                <tr>
                    <th>同户人信息</th>
                    <td colSpan="3" className="text-center"><a href="javascript:void(0)">详细</a></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
