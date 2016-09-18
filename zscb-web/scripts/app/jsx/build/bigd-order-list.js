var OrderListActions = Reflux.createActions(['search']);

var OrderListStore = Reflux.createStore({
    listenables: [OrderListActions],
    onSearch: function (data) {
        var url = SiteProperties.serverURL + BigDAPI.getOrderList;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        //if (data.accessToken == null || data.accessToken == "") {
        //    location.href = SiteProperties.clientURL + Page.login;
        //    return false;
        //}

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

var OrderList = React.createClass({displayName: "OrderList",
    mixins: [Reflux.connect(OrderListStore, 'orderListData')],
    getInitialState: function () {
        return {
            searchCondition:{
                channelID: 0
            },
            orderListData: {
                page: {},
                orderList: []
            }
        };
    },
    componentDidMount(){
        $('.form_date').datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            format: 'yyyy-mm-dd'
        });

        OrderListActions.search(this.state);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuBigDOrderHistory"}), 
                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.bigdOrderList}), 
                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "查询条件"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "开始时间")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("div", {className: "input-group date form_date", "data-date": "", 
                                                 "data-date-format": "yyyy-mm-dd", 
                                                 "data-link-field": "startDate", "data-link-format": "yyyy-mm-dd"}, 
                                                React.createElement("input", {id: "startDate", className: "form-control", type: "text", 
                                                       ref: "inputStartDate", 
                                                       readonly: true}), 
                                                React.createElement("span", {className: "input-group-addon"}, 
                                                    React.createElement("span", {className: "glyphicon glyphicon-calendar"})
                                                )
                                            )
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "结束时间")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("div", {className: "input-group date form_date", "data-date": "", 
                                                 "data-date-format": "yyyy-mm-dd", 
                                                 "data-link-field": "endDate", "data-link-format": "yyyy-mm-dd"}, 
                                                React.createElement("input", {id: "endDate", className: "form-control", type: "text", ref: "inputEndDate", 
                                                       readonly: true}), 
                                                React.createElement("span", {className: "input-group-addon"}, 
                                                    React.createElement("span", {className: "glyphicon glyphicon-calendar"})
                                                )
                                            )
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "查询")
                                    )
                                )
                            )
                        ), 
                        React.createElement(OrderListTable, {orderList: this.state.orderListData.orderList}), 

                        React.createElement(Pager, {callbackParent: this.onChildChanged, 
                               recordSum: this.state.orderListData.page.recordSum, 
                               currentPage: this.state.orderListData.page.currentPage, 
                               pageSum: this.state.orderListData.page.pageSum}), 

                        React.createElement(Footer, null)

                    )
                )

            )
        );
    }
});

var OrderListTable = React.createClass({displayName: "OrderListTable",
    render: function () {
        return (
            React.createElement("table", {className: "table table-hover"}, 
                React.createElement("thead", null, 
                React.createElement("tr", null, 
                    React.createElement("th", null, "订单ID"), 
                    React.createElement("th", null, "订单号"), 
                    React.createElement("th", null, "状态"), 
                    React.createElement("th", null, "创建时间"), 
                    React.createElement("th", null, "支付时间"), 
                    React.createElement("th", null, "完成时间"), 
                    React.createElement("th", null, "支付费用")
                )
                ), 
                React.createElement("tbody", null, 
                this.props.orderList.map(function (item) {
                    return React.createElement(OrderListTableRow, {key: item.id, order: item})
                })
                )
            )
        );
    }
});

var OrderListTableRow = React.createClass({displayName: "OrderListTableRow",
    handleLink: function (orderID) {
        sessionStorage.setItem(SessionKey.orderID, orderID);
        location.href = SiteProperties.webURL + Page.bigdOrderDetail;
    },
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, React.createElement("a", {href: "javascript:void(0)", onClick: this.handleLink.bind(null, this.props.order.id)}, 
                    this.props.order.id
                )), 
                React.createElement("td", null, React.createElement("a", {href: "javascript:void(0)", onClick: this.handleLink.bind(null, this.props.order.id)}, 
                    this.props.order.serial_number
                )), 
                React.createElement("td", null, this.props.order.status), 
                React.createElement("td", null, this.props.order.create_time), 
                React.createElement("td", null, this.props.order.pay_time), 
                React.createElement("td", null, this.props.order.complete_time), 
                React.createElement("td", null, this.props.order.actual_cost)
            )
        );
    }
});

ReactDOM.render(
    React.createElement(OrderList, null),
    document.getElementById('page')
);