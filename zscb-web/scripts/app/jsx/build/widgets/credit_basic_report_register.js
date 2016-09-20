/**
 * Created by Ethan on 16/9/19.
 */
var ReportRegister = React.createClass({displayName: "ReportRegister",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "二、婚姻信息"), 
                React.createElement("h4", {className: "sub-title"}, "1、婚姻信息"), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportMarriedSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportMarriedMate, null)
                    )
                ), 
                React.createElement("h4", {className: "sub-title"}, "2、户籍信息"), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportRegisterSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportRegisterMate, null)
                    )
                )
            )
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
var ReportMarriedSelf = React.createClass({displayName: "ReportMarriedSelf",
    mixins: [Reflux.connect(ReportMarriedSelfStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportMarriedSelfActions.getRegisterInfo(this.state);
    },
    render: function () {
        var isMarried = "";
        if(this.state.register.isMarried){
            isMarried = "已婚";
        } else{
            isMarried = "未婚";
        }
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "婚姻"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, isMarried)
                )
                )
            )
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
var ReportMarriedMate = React.createClass({displayName: "ReportMarriedMate",
    mixins: [Reflux.connect(ReportMarriedMateStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportMarriedMateActions.getRegisterInfo(this.state);
    },
    render: function () {
        var isMarried = "";
        if(this.state.register.isMarried){
            isMarried = "已婚";
        } else{
            isMarried = "未婚";
        }
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "婚姻"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, isMarried)
                )
                )
            )
        );
    }
});

var ReportRegisterSelf = React.createClass({displayName: "ReportRegisterSelf",
    mixins: [Reflux.connect(ReportMarriedSelfStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    render: function () {
        var isMarried = "";
        if(this.state.register.isMarried){
            isMarried = "已婚";
        } else{
            isMarried = "未婚";
        }
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "户籍地址"), 
                    React.createElement("td", {colSpan: "3"}, this.state.register.registerAddress)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "籍贯"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.register.rootAddress), 
                    React.createElement("th", {className: "col-xs-3"}, "出生地"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.register.bornAddress)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "婚姻"), 
                    React.createElement("td", null, isMarried), 
                    React.createElement("th", null, "曾用名"), 
                    React.createElement("td", null, this.state.register.usedName)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "同户人信息"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, React.createElement("a", {href: "javascript:void(0)"}, "详细"))
                )
                )
            )
        );
    }
});
var ReportRegisterMate = React.createClass({displayName: "ReportRegisterMate",
    mixins: [Reflux.connect(ReportMarriedMateStore, 'register')],
    getInitialState: function () {
        return {
            register: {}
        };
    },
    render: function () {
        var isMarried = "";
        if(this.state.register.isMarried){
            isMarried = "已婚";
        } else{
            isMarried = "未婚";
        }
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "户籍地址"), 
                    React.createElement("td", {colSpan: "3"}, this.state.register.registerAddress)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "籍贯"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.register.rootAddress), 
                    React.createElement("th", {className: "col-xs-3"}, "出生地"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.register.bornAddress)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "婚姻"), 
                    React.createElement("td", null, isMarried), 
                    React.createElement("th", null, "曾用名"), 
                    React.createElement("td", null, this.state.register.usedName)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "同户人信息"), 
                    React.createElement("td", {colSpan: "3", className: "text-center"}, React.createElement("a", {href: "javascript:void(0)"}, "详细"))
                )
                )
            )
        );
    }
});
