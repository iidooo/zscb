/**
 * Created by Ethan on 16/9/19.
 */

var ReportIdentity = React.createClass({displayName: "ReportIdentity",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "一、身份信息"), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportIdentitySelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportIdentityMate, null)
                    )
                )
            )
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
var ReportIdentitySelf = React.createClass({displayName: "ReportIdentitySelf",
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
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.name), 
                    React.createElement("td", {className: "col-xs-3 text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "身份证号"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.idnumber), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "联系方式"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.mobile), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "银行卡号"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.bankNumber), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "房产证号"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.houseNumber), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "要素验证结果"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, match)
                )
                )
            )
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
var ReportIdentityMate = React.createClass({displayName: "ReportIdentityMate",
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
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.name), 
                    React.createElement("td", {className: "col-xs-3 text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "身份证号"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.idnumber), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "联系方式"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.mobile), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "银行卡号"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.bankNumber), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "房产证号"), 
                    React.createElement("td", {colSpan: "2"}, this.state.identity.houseNumber), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "要素验证结果"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, match)
                )
                )
            )
        );
    }
});