var ReportPawnActions = Reflux.createActions(['getPawnInfo']);
var ReportPawnStore = Reflux.createStore({
    listenables: [ReportPawnActions],
    onGetPawnInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getPawnInfo;

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
var ReportPawn = React.createClass({displayName: "ReportPawn",
    mixins: [Reflux.connect(ReportPawnStore, 'pawn')],
    getInitialState: function () {
        return {
            pawn: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportPawnActions.getPawnInfo(this.state);
    },
    render: function () {
        return (
        React.createElement("div", null, 
            React.createElement("h3", {className: "title"}, "九、抵押物信息"), 
            React.createElement("h4", {className: "sub-title"}, "1、抵押物"), 

            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-xs-12"}, 
                    React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                        React.createElement("tbody", null, 
                        React.createElement("tr", null, 
                            React.createElement("th", {className: "col-xs-2"}, "产证号"), 
                            React.createElement("td", {className: "col-xs-4 text-center"}, "产调"), 
                            React.createElement("th", {className: "col-xs-2"}, "价值"), 
                            React.createElement("td", {className: "col-xs-4 text-center"}, this.state.pawn.houseWorth, " 万元（评估报告）")
                        ), 
                        React.createElement("tr", null, 
                            React.createElement("th", {className: "col-xs-2"}, "房龄"), 
                            React.createElement("td", {className: "col-xs-4 text-center"}, this.state.pawn.houseAge), 
                            React.createElement("th", {className: "col-xs-2"}, "户口数"), 
                            React.createElement("td", {className: "col-xs-4 text-center"}, this.state.pawn.registerNum)
                        )
                        )
                    )
                )
            ), 

            React.createElement("h4", {className: "sub-title"}, "2、抵押人"), 

            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-xs-12"}, 
                    React.createElement(ReportPeopleList, null)
                )
            )
        )

        );
    }
});

var ReportPeopleList = React.createClass({displayName: "ReportPeopleList",
    mixins: [Reflux.connect(ReportPawnStore, 'pawn')],
    getInitialState: function () {
        return {
            pawn: {
                peopleList: []
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                this.state.pawn.peopleList.map(function (item, index) {
                    return React.createElement(ReportPeopleListItem, {key: item.peopleID, item: item, index: index})
                })
                )
            )
        );
    }
});
var ReportPeopleListItem = React.createClass({displayName: "ReportPeopleListItem",
    render: function () {
        var isMatch = "";
        if(this.props.item.isMatch){
            isMatch = "一致";
        } else {
            isMatch = "非一致";
        }

        return (
            React.createElement("tr", null, 
                React.createElement("th", {className: "col-xs-2"}, "抵押人 ", this.props.index + 1), 
                React.createElement("td", {className: "col-xs-2"}, this.props.item.name), 
                React.createElement("th", {className: "col-xs-2"}, "身份证号"), 
                React.createElement("td", {className: "col-xs-2"}, this.props.item.idnumber), 
                React.createElement("th", {className: "col-xs-2"}, "身份验证"), 
                React.createElement("td", {className: "col-xs-2"}, isMatch)
            )
        );
    }
});
