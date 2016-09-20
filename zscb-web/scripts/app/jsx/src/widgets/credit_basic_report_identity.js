/**
 * Created by Ethan on 16/9/19.
 */

var ReportIdentity = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">一、身份信息</h3>
                <div className="row">
                    <div className="col-xs-6">
                        <ReportIdentitySelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportIdentityMate/>
                    </div>
                </div>
            </div>
        );
    }
});

var ReportIdentitySelfActions = Reflux.createActions(['getIdentityInfo']);
var ReportIdentitySelfStore = Reflux.createStore({
    listenables: [ReportIdentitySelfActions],
    onGetIdentityInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIdentityInfo;

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
var ReportIdentitySelf = React.createClass({
    mixins: [Reflux.connect(ReportIdentitySelfStore, 'identity')],
    getInitialState: function () {
        return {
            identity: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportIdentitySelfActions.getIdentityInfo(this.state);
    },
    render: function () {
        var match = "";
        if(this.state.identity.isMatch){
            match = "一致";
        } else{
            match = "不一致";
        }
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">姓名</th>
                    <td colSpan="2">{this.state.identity.name}</td>
                    <td className="col-xs-3 text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>身份证号</th>
                    <td colSpan="2">{this.state.identity.idnumber}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>联系方式</th>
                    <td colSpan="2">{this.state.identity.mobile}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>银行卡号</th>
                    <td colSpan="2">{this.state.identity.bankNumber}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>房产证号</th>
                    <td colSpan="2">{this.state.identity.houseNumber}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>要素验证结果</th>
                    <td colSpan="3" className="text-center">{match}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var ReportIdentityMateActions = Reflux.createActions(['getIdentityInfo']);
var ReportIdentityMateStore = Reflux.createStore({
    listenables: [ReportIdentityMateActions],
    onGetIdentityInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIdentityInfo;

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
var ReportIdentityMate = React.createClass({
    mixins: [Reflux.connect(ReportIdentityMateStore, 'identity')],
    getInitialState: function () {
        return {
            identity: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportIdentityMateActions.getIdentityInfo(this.state);
    },
    render: function () {
        var match = "";
        if(this.state.identity.isMatch){
            match = "一致";
        } else{
            match = "不一致";
        }
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">姓名</th>
                    <td colSpan="2">{this.state.identity.name}</td>
                    <td className="col-xs-3 text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>身份证号</th>
                    <td colSpan="2">{this.state.identity.idnumber}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>联系方式</th>
                    <td colSpan="2">{this.state.identity.mobile}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>银行卡号</th>
                    <td colSpan="2">{this.state.identity.bankNumber}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>房产证号</th>
                    <td colSpan="2">{this.state.identity.houseNumber}</td>
                    <td className="text-center"><a href="#">详细</a></td>
                </tr>
                <tr>
                    <th>要素验证结果</th>
                    <td colSpan="3" className="text-center">{match}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});