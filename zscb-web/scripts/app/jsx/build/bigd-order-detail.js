var OrderDetailActions = Reflux.createActions(['getOrder']);

var OrderDetailStore = Reflux.createStore({
    listenables: [OrderDetailActions],
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

var OrderDetail = React.createClass({displayName: "OrderDetail",
    mixins: [Reflux.connect(OrderDetailStore, 'order')],
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
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuBigDOrderHistory"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.bigdOrderDetail}), 

                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "资信查询详细说明"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row"}, 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderDetailSelf, {detail: detailSelf})
                                    ), 
                                    React.createElement("div", {className: "col-xs-6"}, 
                                        React.createElement(OrderDetailMate, {detail: detailMeta})
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


var OrderDetailSelf = React.createClass({displayName: "OrderDetailSelf",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-1"}, "序号"), 
                    React.createElement("th", {className: "col-xs-3"}, "描述"), 
                    React.createElement("th", {className: "col-xs-3"}, "标签名称"), 
                    React.createElement("th", {className: "col-xs-3"}, "查询参数"), 
                    React.createElement("th", {className: "col-xs-2"}, "查询结果")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "1"), 
                    React.createElement("td", null, "手机号与姓名是否匹配"), 
                    React.createElement("td", null, "tn_is_match"), 
                    React.createElement("td", null, this.props.detail.telephone, " , ", this.props.detail.name), 
                    React.createElement("td", null, this.props.detail.result.tn_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "2"), 
                    React.createElement("td", null, "登记人身份证与姓名是否匹配"), 
                    React.createElement("td", null, "idn_is_match"), 
                    React.createElement("td", null, this.props.detail.id_number, " , ", this.props.detail.name), 
                    React.createElement("td", null, this.props.detail.result.idn_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "3"), 
                    React.createElement("td", null, "手机号和身份证是否匹配"), 
                    React.createElement("td", null, "tid_is_match"), 
                    React.createElement("td", null, this.props.detail.telephone, " , ", this.props.detail.id_number), 
                    React.createElement("td", null, this.props.detail.result.tid_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "4"), 
                    React.createElement("td", null, "手机号、姓名、身份证是否匹配"), 
                    React.createElement("td", null, "tnid_is_match"), 
                    React.createElement("td", null, this.props.detail.telephone, " , ", this.props.detail.id_number, ", ", this.props.detail.name), 
                    React.createElement("td", null, this.props.detail.result.tnid_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "5"), 
                    React.createElement("td", null, "年龄层次"), 
                    React.createElement("td", null, "age"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.age)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "6"), 
                    React.createElement("td", null, "性别"), 
                    React.createElement("td", null, "sex"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.sex)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "7"), 
                    React.createElement("td", null, "终端厂家"), 
                    React.createElement("td", null, "terminal_manufacturers"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.terminal_manufacturers)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "8"), 
                    React.createElement("td", null, "终端机型"), 
                    React.createElement("td", null, "terminal_model"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.terminal_model)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "9"), 
                    React.createElement("td", null, "操作系统"), 
                    React.createElement("td", null, "operating_system"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.operating_system)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "10"), 
                    React.createElement("td", null, "手机入网时间"), 
                    React.createElement("td", null, "in_date"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.in_date)
                )
                )
            )
        );
    }
});

var OrderDetailMate = React.createClass({displayName: "OrderDetailMate",
    render: function () {
        return (
            React.createElement("table", {className: "table table-bordered table-condensed table_inline"}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", {colSpan: "4", className: "text-center"}, "借款人")
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", {className: "col-xs-1"}, "序号"), 
                    React.createElement("th", {className: "col-xs-3"}, "描述"), 
                    React.createElement("th", {className: "col-xs-3"}, "标签名称"), 
                    React.createElement("th", {className: "col-xs-3"}, "查询参数"), 
                    React.createElement("th", {className: "col-xs-2"}, "查询结果")
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "1"), 
                    React.createElement("td", null, "手机号与姓名是否匹配"), 
                    React.createElement("td", null, "tn_is_match"), 
                    React.createElement("td", null, this.props.detail.telephone, " , ", this.props.detail.name), 
                    React.createElement("td", null, this.props.detail.result.tn_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "2"), 
                    React.createElement("td", null, "登记人身份证与姓名是否匹配"), 
                    React.createElement("td", null, "idn_is_match"), 
                    React.createElement("td", null, this.props.detail.id_number, " , ", this.props.detail.name), 
                    React.createElement("td", null, this.props.detail.result.idn_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "3"), 
                    React.createElement("td", null, "手机号和身份证是否匹配"), 
                    React.createElement("td", null, "tid_is_match"), 
                    React.createElement("td", null, this.props.detail.telephone, " , ", this.props.detail.id_number), 
                    React.createElement("td", null, this.props.detail.result.tid_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "4"), 
                    React.createElement("td", null, "手机号、姓名、身份证是否匹配"), 
                    React.createElement("td", null, "tnid_is_match"), 
                    React.createElement("td", null, this.props.detail.telephone, " , ", this.props.detail.id_number, ", ", this.props.detail.name), 
                    React.createElement("td", null, this.props.detail.result.tnid_is_match)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "5"), 
                    React.createElement("td", null, "年龄层次"), 
                    React.createElement("td", null, "age"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.age)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "6"), 
                    React.createElement("td", null, "性别"), 
                    React.createElement("td", null, "sex"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.sex)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "7"), 
                    React.createElement("td", null, "终端厂家"), 
                    React.createElement("td", null, "terminal_manufacturers"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.terminal_manufacturers)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "8"), 
                    React.createElement("td", null, "终端机型"), 
                    React.createElement("td", null, "terminal_model"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.terminal_model)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "9"), 
                    React.createElement("td", null, "操作系统"), 
                    React.createElement("td", null, "operating_system"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.operating_system)
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", null, "10"), 
                    React.createElement("td", null, "手机入网时间"), 
                    React.createElement("td", null, "in_date"), 
                    React.createElement("td", null, this.props.detail.telephone), 
                    React.createElement("td", null, this.props.detail.result.in_date)
                )
                )
            )
        );
    }
});

ReactDOM.render(
    React.createElement(OrderDetail, null),
    document.getElementById('page')
);