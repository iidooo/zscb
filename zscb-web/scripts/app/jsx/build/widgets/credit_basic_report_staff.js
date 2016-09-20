/**
 * Created by Ethan on 16/9/19.
 */
var ReportStaff = React.createClass({displayName: "ReportStaff",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "title"}, "三、职业信息"), 
                React.createElement("h4", {className: "sub-title"}, "1、个人社会保险信息"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportSocialSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportSocialMate, null)
                    )
                ), 

                React.createElement("h4", {className: "sub-title"}, "2、个人工作经历"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportExpSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportExpMate, null)
                    )
                ), 

                React.createElement("h4", {className: "sub-title"}, "3、学历信息"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportEduSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportEduMate, null)
                    )
                ), 

                React.createElement("h4", {className: "sub-title"}, "4、个人纳税信息"), 

                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportTaxSelf, null)
                    ), 
                    React.createElement("div", {className: "col-xs-6"}, 
                        React.createElement(ReportTaxMate, null)
                    )
                )
            )
        );
    }
});

var ReportSocialSelfActions = Reflux.createActions(['getStaffInfo']);
var ReportSocialSelfStore = Reflux.createStore({
    listenables: [ReportSocialSelfActions],
    onGetStaffInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getStaffInfo;

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
var ReportSocialSelf = React.createClass({displayName: "ReportSocialSelf",
    mixins: [Reflux.connect(ReportSocialSelfStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportSocialSelfActions.getStaffInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位名称"), 
                    React.createElement("td", {colSpan: "3"}, this.state.staff.socialCompany)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳状态"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.staff.socialStatus), 
                    React.createElement("th", {className: "col-xs-3"}, "最后缴纳时间"), 
                    React.createElement("td", {className: "col-xs-3"}, formatDate(this.state.staff.socialLastDate))
                )
                )
            )
        );
    }
});

var ReportSocialMateActions = Reflux.createActions(['getStaffInfo']);
var ReportSocialMateStore = Reflux.createStore({
    listenables: [ReportSocialMateActions],
    onGetStaffInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getStaffInfo;

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
var ReportSocialMate = React.createClass({displayName: "ReportSocialMate",
    mixins: [Reflux.connect(ReportSocialMateStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.mateIdentityID);
        ReportSocialMateActions.getStaffInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位名称"), 
                    React.createElement("td", {colSpan: "3"}, this.state.staff.socialCompany)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳状态"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.staff.socialStatus), 
                    React.createElement("th", {className: "col-xs-3"}, "最后缴纳时间"), 
                    React.createElement("td", {className: "col-xs-3"}, formatDate(this.state.staff.socialLastDate))
                )
                )
            )
        );
    }
});

var ReportExpSelf = React.createClass({displayName: "ReportExpSelf",
    mixins: [Reflux.connect(ReportSocialSelfStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {
                staffExpList: []
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "3", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3 text-center"}, "入职时间"), 
                    React.createElement("th", {className: "col-xs-3 text-center"}, "离职时间"), 
                    React.createElement("th", {className: "col-xs-6 text-center"}, "公司名称")
                ), 
                this.state.staff.staffExpList.map(function (item) {
                    return React.createElement(ReportExpItemSelf, {key: item.expID, item: item})
                })
                )
            )
        );
    }
});
var ReportExpItemSelf = React.createClass({displayName: "ReportExpItemSelf",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("td", {className: "text-center"}, formatDate(this.props.item.enterDate)), 
                React.createElement("td", {className: "text-center"}, formatDate(this.props.item.leaveDate)), 
                React.createElement("td", {className: "text-center"}, this.props.item.company)
            )
        );
    }
});

var ReportExpMate = React.createClass({displayName: "ReportExpMate",
    mixins: [Reflux.connect(ReportSocialMateStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {
                staffExpList: []
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "3", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3 text-center"}, "入职时间"), 
                    React.createElement("th", {className: "col-xs-3 text-center"}, "离职时间"), 
                    React.createElement("th", {className: "col-xs-6 text-center"}, "公司名称")
                ), 
                this.state.staff.staffExpList.map(function (item) {
                    return React.createElement(ReportExpItemMate, {key: item.expID, item: item})
                })
                )
            )
        );
    }
});
var ReportExpItemMate = React.createClass({displayName: "ReportExpItemMate",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("td", {className: "text-center"}, formatDate(this.props.item.enterDate)), 
                React.createElement("td", {className: "text-center"}, formatDate(this.props.item.leaveDate)), 
                React.createElement("td", {className: "text-center"}, this.props.item.company)
            )
        );
    }
});


var ReportEduSelf = React.createClass({displayName: "ReportEduSelf",
    mixins: [Reflux.connect(ReportSocialSelfStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "毕业院校"), 
                    React.createElement("td", {colSpan: "3", className: "col-xs-9"}, this.state.staff.graduateSchool)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "最高学位"), 
                    React.createElement("td", {colSpan: "3"}, this.state.staff.highestDegree)
                )
                )
            )
        );
    }
});
var ReportEduMate = React.createClass({displayName: "ReportEduMate",
    mixins: [Reflux.connect(ReportSocialMateStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "毕业院校"), 
                    React.createElement("td", {colSpan: "3", className: "col-xs-9"}, this.state.staff.graduateSchool)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "最高学位"), 
                    React.createElement("td", {colSpan: "3"}, this.state.staff.highestDegree)
                )
                )
            )
        );
    }
});


var ReportTaxSelf = React.createClass({displayName: "ReportTaxSelf",
    mixins: [Reflux.connect(ReportSocialSelfStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位名称"), 
                    React.createElement("td", {colSpan: "3"}, this.state.staff.taxCompany)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳状态"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.staff.taxStatus), 
                    React.createElement("th", {className: "col-xs-3"}, "最后缴纳时间"), 
                    React.createElement("td", {className: "col-xs-3"}, formatDate(this.state.staff.taxLastDate))
                )
                )
            )
        );
    }
});
var ReportTaxMate = React.createClass({displayName: "ReportTaxMate",
    mixins: [Reflux.connect(ReportSocialMateStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {
            }
        };
    },
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位名称"), 
                    React.createElement("td", {colSpan: "3"}, this.state.staff.taxCompany)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳状态"), 
                    React.createElement("td", {className: "col-xs-3"}, this.state.staff.taxStatus), 
                    React.createElement("th", {className: "col-xs-3"}, "最后缴纳时间"), 
                    React.createElement("td", {className: "col-xs-3"}, formatDate(this.state.staff.taxLastDate))
                )
                )
            )
        );
    }
});