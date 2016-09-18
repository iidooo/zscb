/**
 * Created by Ethan on 16/5/20.
 */

var OrderActions = Reflux.createActions(['getOrder']);

var OrderStore = Reflux.createStore({
    listenables: [OrderActions],
    onGetOrder: function (data) {
        var url = SiteProperties.serverURL + BigDAPI.getOrder;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.id = sessionStorage.getItem(SessionKey.orderID);
        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            //location.href = SiteProperties.clientURL + Page.login;
            //return false;
        }

        var self = this;
        var callback = function (result) {
            if (result.status == 200) {
                //console.log(result.data.details);
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    },
});

var Order = React.createClass({displayName: "Order",
    mixins: [Reflux.connect(OrderStore, 'order')],
    getInitialState: function () {
        return {
            order: {
                details: []
            }
        };
    },
    componentDidMount: function () {
        OrderActions.getOrder(this.state);
    },
    render: function () {
        var detailSelf = {};
        var detailMeta = {};
        if(this.state.order != null && this.state.order.details.length > 0){
            detailSelf = this.state.order.details[0];
            if(this.state.order.details.length >= 2) {
                detailMeta = this.state.order.details[1];
            }
        }
        console.log(detailSelf);
        console.log(detailMeta);
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuBigD"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMenuID: "sideMenuBigDOrderHistory"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.bigdOrderDetail}), 

                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "资信查询详细说明"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderAbstractSelf, {detail: detailSelf})
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderAbstractMeta, {detail: detailMeta})
                                    )
                                ), 
                                React.createElement("h3", {className: "title"}, "一、身份信息"), 
                                React.createElement("h4", {className: "sub-title"}, "基础信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityBasicSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityBasicMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "户籍信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityRegistrySelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityRegistryMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "学历信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityEducationSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityEducationMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "居所"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityAddressSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityAddressMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "联系方式"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityConnectSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderIdentityConnectMeta, null)
                                    )
                                ), 
                                React.createElement("h3", {className: "title"}, "二、职业信息"), 
                                React.createElement("h4", {className: "sub-title"}, "个人社会保险信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderStuffSocialSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderStuffSocialMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "个人公积金信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderStuffFundSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderStuffFundMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "个人工作经历"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderStuffExpSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderStuffExpMeta, null)
                                    )
                                ), 
                                React.createElement("h3", {className: "title"}, "三、财产信息"), 
                                React.createElement("h4", {className: "sub-title"}, "房产信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderAssetHouseSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderAssetHouseMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "车辆信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderAssetCarSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderAssetCarMeta, null)
                                    )
                                ), 
                                React.createElement("h3", {className: "title"}, "四、信用卡逾期"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderCreditExpireSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderCreditExpireMeta, null)
                                    )
                                ), 
                                React.createElement("h3", {className: "title"}, "五、违法记录"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderLawBreakSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderLawBreakMeta, null)
                                    )
                                ), 
                                React.createElement("h3", {className: "title"}, "六、司法记录"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderJusticeSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderJusticeMeta, null)
                                    )
                                ), 
                                React.createElement("h4", {className: "sub-title"}, "黑名单信息"), 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderBlackListSelf, null)
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderBlackListMeta, null)
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

var OrderAbstractSelf = React.createClass({displayName: "OrderAbstractSelf",
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
var OrderAbstractMeta = React.createClass({displayName: "OrderAbstractMeta",
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


/*身份基本信息*/
var OrderIdentityBasicSelf = React.createClass({displayName: "OrderIdentityBasicSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "性别"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "身份证号"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "出生年月"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "验证结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});
var OrderIdentityBasicMeta = React.createClass({displayName: "OrderIdentityBasicMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "姓名"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "性别"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "身份证号"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "出生年月"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "验证结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

/*户籍信息*/
var OrderIdentityRegistrySelf = React.createClass({displayName: "OrderIdentityRegistrySelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "籍贯"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "出生地"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "户籍"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "民族"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "婚姻"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "曾用名"), 
                    React.createElement("td", null)
                )
                )
            )
        );
    }
});
var OrderIdentityRegistryMeta = React.createClass({displayName: "OrderIdentityRegistryMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "籍贯"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "出生地"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "户籍"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "民族"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "婚姻"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "曾用名"), 
                    React.createElement("td", null)
                )
                )
            )
        );
    }
});

/*学历信息*/
var OrderIdentityEducationSelf = React.createClass({displayName: "OrderIdentityEducationSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "毕业院校"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "毕业时间"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "学历"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "学位"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});
var OrderIdentityEducationMeta = React.createClass({displayName: "OrderIdentityEducationMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "毕业院校"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "毕业时间"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "学历"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "学位"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

/*居所*/
var OrderIdentityAddressSelf = React.createClass({displayName: "OrderIdentityAddressSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "固定居所"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});
var OrderIdentityAddressMeta = React.createClass({displayName: "OrderIdentityAddressMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "固定居所"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

/*联系方式*/
var OrderIdentityConnectSelf = React.createClass({displayName: "OrderIdentityConnectSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "配对手机号码数"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "手机号码"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "实名认证"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "手机入网时长"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "上个月通话时长"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "上班时段常驻地理位置"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "休息时段常驻地理位置"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "是否呼叫澳门电话"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "号码归属地市"), 
                    React.createElement("td", null)
                )
                )
            )
        );
    }
});
var OrderIdentityConnectMeta = React.createClass({displayName: "OrderIdentityConnectMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "配对手机号码数"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "手机号码"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "实名认证"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "手机入网时长"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "上个月通话时长"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "上班时段常驻地理位置"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "休息时段常驻地理位置"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "是否呼叫澳门电话"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "号码归属地市"), 
                    React.createElement("td", null)
                )
                )
            )
        );
    }
});

/*个人社会保险信息 */
var OrderStuffSocialSelf = React.createClass({displayName: "OrderStuffSocialSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位名称"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳状态"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "最后缴纳时间"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "缴纳基数"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "缴纳金额"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "最新更新时间"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});
var OrderStuffSocialMeta = React.createClass({displayName: "OrderStuffSocialMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳单位名称"), 
                    React.createElement("td", {colSpan: "3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "缴纳状态"), 
                    React.createElement("td", {className: "col-xs-3"}), 
                    React.createElement("th", {className: "col-xs-3"}, "最后缴纳时间"), 
                    React.createElement("td", {className: "col-xs-3"})
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "缴纳基数"), 
                    React.createElement("td", null), 
                    React.createElement("th", null, "缴纳金额"), 
                    React.createElement("td", null)
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, "最新更新时间"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

/*个人公积金信息 */
var OrderStuffFundSelf = React.createClass({displayName: "OrderStuffFundSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "4", className: "text-center"}, "未匹配到借款人的个人公积金信息")
                )
                )
            )
        );
    }
});
var OrderStuffFundMeta = React.createClass({displayName: "OrderStuffFundMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "4", className: "text-center"}, "未匹配到配偶的个人公积金信息")
                )
                )
            )
        );
    }
});

/*个人工作经历 */
var OrderStuffExpSelf = React.createClass({displayName: "OrderStuffExpSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "text-center"}, "入职时间"), 
                    React.createElement("th", {className: "text-center"}, "离职时间"), 
                    React.createElement("th", {className: "text-center"}, "公司名称")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null), 
                    React.createElement("td", null), 
                    React.createElement("td", null)
                )
                )
            )
        );
    }
});
var OrderStuffExpMeta = React.createClass({displayName: "OrderStuffExpMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "text-center"}, "入职时间"), 
                    React.createElement("th", {className: "text-center"}, "离职时间"), 
                    React.createElement("th", {className: "text-center"}, "公司名称")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null), 
                    React.createElement("td", null), 
                    React.createElement("td", null)
                )
                )
            )
        );
    }
});

/*房产信息 */
var OrderAssetHouseSelf = React.createClass({displayName: "OrderAssetHouseSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "反馈结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});
var OrderAssetHouseMeta = React.createClass({displayName: "OrderAssetHouseMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "反馈结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

/*车辆信息 */
var OrderAssetCarSelf = React.createClass({displayName: "OrderAssetCarSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "反馈结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});
var OrderAssetCarMeta = React.createClass({displayName: "OrderAssetCarMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "反馈结果"), 
                    React.createElement("td", {colSpan: "3"})
                )
                )
            )
        );
    }
});

/*信用卡逾期 */
var OrderCreditExpireSelf = React.createClass({displayName: "OrderCreditExpireSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "逾期记录 "), 
                    React.createElement("td", {colSpan: "3"}, "0条")
                )
                )
            )
        );
    }
});
var OrderCreditExpireMeta = React.createClass({displayName: "OrderCreditExpireMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "逾期记录 "), 
                    React.createElement("td", {colSpan: "3"}, "0条")
                )
                )
            )
        );
    }
});

/*违法记录 */
var OrderLawBreakSelf = React.createClass({displayName: "OrderLawBreakSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "违法记录 "), 
                    React.createElement("td", {colSpan: "3"}, "详细")
                )
                )
            )
        );
    }
});
var OrderLawBreakMeta = React.createClass({displayName: "OrderLawBreakMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "违法记录 "), 
                    React.createElement("td", {colSpan: "3"}, "详细")
                )
                )
            )
        );
    }
});

/*司法信息 */
var OrderJusticeSelf = React.createClass({displayName: "OrderJusticeSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "司法记录 "), 
                    React.createElement("td", {colSpan: "3"}, "0条")
                )
                )
            )
        );
    }
});
var OrderJusticeMeta = React.createClass({displayName: "OrderJusticeMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "司法记录 "), 
                    React.createElement("td", {colSpan: "3"}, "0条")
                )
                )
            )
        );
    }
});

/*黑名单信息 */
var OrderBlackListSelf = React.createClass({displayName: "OrderBlackListSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "黑名单记录"), 
                    React.createElement("td", {colSpan: "3"}, "0条")
                )
                )
            )
        );
    }
});
var OrderBlackListMeta = React.createClass({displayName: "OrderBlackListMeta",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "配偶")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-3"}, "黑名单记录 "), 
                    React.createElement("td", {colSpan: "3"}, "0条")
                )
                )
            )
        );
    }
});




ReactDOM.render(
    React.createElement(Order, null),
    document.getElementById('page')
);
