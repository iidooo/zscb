/**
 * Created by Ethan on 16/9/19.
 */
var ReportAsset = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">五、资产信息</h3>
                <h4 className="sub-title">1、房产信息</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportAssetHouseSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportAssetHouseMate/>
                    </div>
                </div>

                <h4 className="sub-title">2、车辆信息</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportAssetVehicleSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportAssetVehicleMate/>
                    </div>
                </div>
            </div>
        );
    }
});

var ReportAssetHouseSelfActions = Reflux.createActions(['getHouseList']);
var ReportAssetHouseSelfStore = Reflux.createStore({
    listenables: [ReportSocialSelfActions],
    onGetHouseList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getHouseList;

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
var ReportAssetHouseSelf = React.createClass({
    mixins: [Reflux.connect(ReportAssetHouseSelfStore, 'houseList')],
    getInitialState: function () {
        return {
            houseList: []
        };
    },
    componentDidMount: function () {
        //this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        //ReportSocialSelfActions.getStaffInfo(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">反馈结果</th>
                    <td colSpan="3" className="text-center">详情</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var ReportAssetHouseMateActions = Reflux.createActions(['getHouseList']);
var ReportAssetHouseMateStore = Reflux.createStore({
    listenables: [ReportAssetHouseMateActions],
    onGetHouseList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getHouseList;

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
var ReportAssetHouseMate = React.createClass({
    mixins: [Reflux.connect(ReportAssetHouseMateStore, 'houseList')],
    getInitialState: function () {
        return {
            houseList: []
        };
    },
    componentDidMount: function () {
        //this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        //ReportSocialSelfActions.getStaffInfo(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">反馈结果</th>
                    <td colSpan="3" className="text-center">详情</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var ReportAssetVehicleSelfActions = Reflux.createActions(['getVehicleList']);
var ReportAssetVehicleSelfStore = Reflux.createStore({
    listenables: [ReportAssetVehicleSelfActions],
    onGetVehicleList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getVehicleList;

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
var ReportAssetVehicleSelf = React.createClass({
    mixins: [Reflux.connect(ReportAssetVehicleSelfStore, 'vehicleList')],
    getInitialState: function () {
        return {
            vehicleList: []
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportAssetVehicleSelfActions.getVehicleList(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="3" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-4 text-center">车辆品牌</th>
                    <th className="col-xs-4 text-center">是否沪牌</th>
                    <th className="col-xs-4 text-center">抵押状态</th>
                </tr>
                {this.state.vehicleList.map(function (item, index) {
                    return <ReportAssetVehicleItemSelf key={item.vehicleID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportAssetVehicleItemSelf = React.createClass({
    render: function () {
        var isShanghai = "";
        if(this.props.item.isShanghai){
            isShanghai = "是";
        } else{
            isShanghai = "否";
        }
        return (
            <tr>
                <td className="text-center">{this.props.item.maker}</td>
                <td className="text-center">{isShanghai}</td>
                <td className="text-center">{this.props.item.status}</td>
            </tr>
        );
    }
});

var ReportAssetVehicleMateActions = Reflux.createActions(['getVehicleList']);
var ReportAssetVehicleMateStore = Reflux.createStore({
    listenables: [ReportAssetVehicleMateActions],
    onGetVehicleList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getVehicleList;

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
var ReportAssetVehicleMate = React.createClass({
    mixins: [Reflux.connect(ReportAssetVehicleMateStore, 'vehicleList')],
    getInitialState: function () {
        return {
            vehicleList: []
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportAssetVehicleMateActions.getVehicleList(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="3" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-4 text-center">车辆品牌</th>
                    <th className="col-xs-4 text-center">是否沪牌</th>
                    <th className="col-xs-4 text-center">抵押状态</th>
                </tr>
                {this.state.vehicleList.map(function (item, index) {
                    return <ReportAssetVehicleItemMate key={item.vehicleID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportAssetVehicleItemMate = React.createClass({
    render: function () {
        var isShanghai = "";
        if(this.props.item.isShanghai){
            isShanghai = "是";
        } else{
            isShanghai = "否";
        }
        return (
            <tr>
                <td className="text-center">{this.props.item.maker}</td>
                <td className="text-center">{isShanghai}</td>
                <td className="text-center">{this.props.item.status}</td>
            </tr>
        );
    }
});