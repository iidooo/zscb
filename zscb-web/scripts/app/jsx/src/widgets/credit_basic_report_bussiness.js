/**
 * Created by Ethan on 16/9/19.
 */
var ReportBussiness = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">四、经营状况</h3>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportBussinessSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportBussinessMate/>
                    </div>
                </div>
            </div>
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
var ReportBussinessSelf = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                {this.state.bussinessList.map(function (item, index) {
                    return <ReportBussinessItemSelf key={item.bussinessID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportBussinessItemSelf = React.createClass({
    render: function () {
        return (
            <tr>
                <th className="col-xs-3">关联平台名称 {this.props.index + 1}</th>
                <td className="col-xs-3">{this.props.item.plantform}</td>
                <th className="col-xs-3">状态</th>
                <td className="col-xs-3">{this.props.item.status}</td>
            </tr>
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
var ReportBussinessMate = React.createClass({
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
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                {this.state.bussinessList.map(function (item, index) {
                    return <ReportBussinessItemMate key={item.bussinessID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportBussinessItemMate = React.createClass({
    render: function () {
        return (
            <tr>
                <th className="col-xs-3">关联平台名称 {this.props.index + 1}</th>
                <td className="col-xs-3">{this.props.item.plantform}</td>
                <th className="col-xs-3">状态</th>
                <td className="col-xs-3">{this.props.item.status}</td>
            </tr>
        );
    }
});