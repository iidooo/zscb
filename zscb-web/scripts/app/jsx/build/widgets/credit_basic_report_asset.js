/**
 * Created by Ethan on 16/9/19.
 */
var ReportAsset = React.createClass({displayName: "ReportAsset",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "五、资产信息"), 
                React.createElement("h4", {className: "sub-title"}, "1、房产信息"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportAssetHouseSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportAssetHouseMate, null)
                    )
                ), 

                React.createElement("h4", {className: "sub-title"}, "2、车辆信息"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportAssetVehicleSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportAssetVehicleMate, null)
                    )
                )
            )
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
var ReportAssetHouseSelf = React.createClass({displayName: "ReportAssetHouseSelf",
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
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "反馈结果"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, "详情")
                )
                )
            )
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
var ReportAssetHouseMate = React.createClass({displayName: "ReportAssetHouseMate",
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
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "反馈结果"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, "详情")
                )
                )
            )
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
var ReportAssetVehicleSelf = React.createClass({displayName: "ReportAssetVehicleSelf",
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
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "3", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-4 text-center"}, "车辆品牌"), 
                    React.createElement("th", {className: "col-xs-4 text-center"}, "是否沪牌"), 
                    React.createElement("th", {className: "col-xs-4 text-center"}, "抵押状态")
                ), 
                this.state.vehicleList.map(function (item, index) {
                    return React.createElement(ReportAssetVehicleItemSelf, {key: item.vehicleID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportAssetVehicleItemSelf = React.createClass({displayName: "ReportAssetVehicleItemSelf",
    render: function () {
        var isShanghai = "";
        if(this.props.item.isShanghai){
            isShanghai = "是";
        } else{
            isShanghai = "否";
        }
        return (
            React.createElement("tr", null, 
                React.createElement("td", {className: "text-center"}, this.props.item.maker), 
                React.createElement("td", {className: "text-center"}, isShanghai), 
                React.createElement("td", {className: "text-center"}, this.props.item.status)
            )
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
var ReportAssetVehicleMate = React.createClass({displayName: "ReportAssetVehicleMate",
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
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "3", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-4 text-center"}, "车辆品牌"), 
                    React.createElement("th", {className: "col-xs-4 text-center"}, "是否沪牌"), 
                    React.createElement("th", {className: "col-xs-4 text-center"}, "抵押状态")
                ), 
                this.state.vehicleList.map(function (item, index) {
                    return React.createElement(ReportAssetVehicleItemMate, {key: item.vehicleID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportAssetVehicleItemMate = React.createClass({displayName: "ReportAssetVehicleItemMate",
    render: function () {
        var isShanghai = "";
        if(this.props.item.isShanghai){
            isShanghai = "是";
        } else{
            isShanghai = "否";
        }
        return (
            React.createElement("tr", null, 
                React.createElement("td", {className: "text-center"}, this.props.item.maker), 
                React.createElement("td", {className: "text-center"}, isShanghai), 
                React.createElement("td", {className: "text-center"}, this.props.item.status)
            )
        );
    }
});