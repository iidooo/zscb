var CreditReportActions = Reflux.createActions(['search']);

var CreditReportStore = Reflux.createStore({
    listenables: [CreditReportActions],
    onSearch: function (data) {
        var url = SiteProperties.serverURL + API.searchCommentList;
        data.accessKey = SecurityClient.accessKey;
        data.accessSecret = SecurityClient.accessSecret;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.siteID = sessionStorage.getItem(SessionKey.siteID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.clientURL + Page.login;
            return false;
        }

        var self = this;
        var callback = function (result) {

            //console.log(result.data);
            if (result.status == 200) {
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    }
});

var CreditReport = React.createClass({displayName: "CreditReport",
    mixins: [Reflux.connect(CreditReportStore, 'commentsData')],
    getInitialState: function () {
        return {
            order: {
                details: []
            }
        };
    },
    componentDidMount: function () {
        //CreditReportActions.search(this.state.searchCondition);
    },
    render: function () {
        var detailSelf = {};
        var detailMeta = {};
        if (this.state.order != null && this.state.order.details.length > 0) {
            detailSelf = this.state.order.details[0];
            if (this.state.order.details.length >= 2) {
                detailMeta = this.state.order.details[1];
            }
        }
        console.log(detailSelf);
        console.log(detailMeta);
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuBussinessManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuBussinessManage", activeMenuID: "sideMenuCreditSearch"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.creditBasicReport}), 

                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "资信验证基础报告"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(ReportAbstractSelf, {detail: detailSelf})
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(ReportAbstractMate, {detail: detailMeta})
                                    )
                                ), 
                                React.createElement("h3", {className: "title"}, "一、身份信息"), 

                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(ReportIdentitySelf, {detail: detailSelf})
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(ReportIdentityMate, {detail: detailMeta})
                                    )
                                )
                            )
                        ), 

                        React.createElement(Footer, null)
                    )
                )

            )
        );
    }
});


var ReportAbstractSelf = React.createClass({displayName: "ReportAbstractSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "一，身份")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {className: "col-xs-3"}, this.props.detail.name), 
                    React.createElement("th", {className: "col-xs-3"}, "籍贯"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "学历"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "关联手机数"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "婚姻"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "固定居所"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "联网核查结果"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "二，职业")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "单位"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "缴金状态"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "收入区间"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "三，财产")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "房产"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "车辆"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "四，信用卡逾期")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "逾期记录"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "黑名单"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "航空记录"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "外宿记录"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "五，违法记录")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "4", className: "text-center"}, "0条")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "六，司法记录")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "4", className: "text-center"}, "0条")
                )
                )
            )
        );
    }
});
var ReportAbstractMate = React.createClass({displayName: "ReportAbstractMate",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "一，身份")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "籍贯"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "学历"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "关联手机数"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "婚姻"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "固定居所"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "联网核查结果"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "二，职业")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "单位"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "缴金状态"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "收入区间"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "三，财产")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "房产"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "车辆"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "四，信用卡逾期")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "逾期记录"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "黑名单"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "航空记录"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "外宿记录"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "五，违法记录")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "4", className: "text-center"}, "0条")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "六，司法记录")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "4", className: "text-center"}, "0条")
                )
                )
            )
        );
    }
});

var ReportIdentitySelf = React.createClass({displayName: "ReportIdentitySelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "col-xs-3 text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "身份证号"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "联系方式"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "银行卡号"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "房产证号"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "要素验证结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

var ReportIdentityMate = React.createClass({displayName: "ReportIdentityMate",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "col-xs-3 text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "身份证号"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "联系方式"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "银行卡号"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "房产证号"), 
                    React.createElement("td", {colSpan: "2"}), 
                    React.createElement("td", {className: "text-center"}, React.createElement("a", {href: "#"}, "详细"))
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "要素验证结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

ReactDOM.render(
    React.createElement(CreditReport, null),
    document.getElementById('page')
);