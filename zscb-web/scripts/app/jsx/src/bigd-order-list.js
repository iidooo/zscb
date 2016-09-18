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

var OrderList = React.createClass({
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
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuBigDOrderHistory"/>
                    <div className="content-page">
                        <Breadcrumb page={Page.bigdOrderList}/>
                        <div className="panel panel-default">
                            <div className="panel-heading">查询条件</div>
                            <div className="panel-body">
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>开始时间</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <div className="input-group date form_date" data-date=""
                                                 data-date-format="yyyy-mm-dd"
                                                 data-link-field="startDate" data-link-format="yyyy-mm-dd">
                                                <input id="startDate" className="form-control" type="text"
                                                       ref="inputStartDate"
                                                       readonly/>
                                                <span className="input-group-addon">
                                                    <span className="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>结束时间</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <div className="input-group date form_date" data-date=""
                                                 data-date-format="yyyy-mm-dd"
                                                 data-link-field="endDate" data-link-format="yyyy-mm-dd">
                                                <input id="endDate" className="form-control" type="text" ref="inputEndDate"
                                                       readonly/>
                                                <span className="input-group-addon">
                                                    <span className="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <button type="button" className="btn btn-primary">查询</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OrderListTable orderList={this.state.orderListData.orderList}/>

                        <Pager callbackParent={this.onChildChanged}
                               recordSum={this.state.orderListData.page.recordSum}
                               currentPage={this.state.orderListData.page.currentPage}
                               pageSum={this.state.orderListData.page.pageSum}/>

                        <Footer/>

                    </div>
                </div>

            </div>
        );
    }
});

var OrderListTable = React.createClass({
    render: function () {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>订单ID</th>
                    <th>订单号</th>
                    <th>状态</th>
                    <th>创建时间</th>
                    <th>支付时间</th>
                    <th>完成时间</th>
                    <th>支付费用</th>
                </tr>
                </thead>
                <tbody>
                {this.props.orderList.map(function (item) {
                    return <OrderListTableRow key={item.id} order={item}/>
                })}
                </tbody>
            </table>
        );
    }
});

var OrderListTableRow = React.createClass({
    handleLink: function (orderID) {
        sessionStorage.setItem(SessionKey.orderID, orderID);
        location.href = SiteProperties.webURL + Page.bigdOrderDetail;
    },
    render: function () {
        return (
            <tr>
                <td><a href="javascript:void(0)" onClick={this.handleLink.bind(null, this.props.order.id)}>
                    {this.props.order.id}
                </a></td>
                <td><a href="javascript:void(0)" onClick={this.handleLink.bind(null, this.props.order.id)}>
                    {this.props.order.serial_number}
                </a></td>
                <td>{this.props.order.status}</td>
                <td>{this.props.order.create_time}</td>
                <td>{this.props.order.pay_time}</td>
                <td>{this.props.order.complete_time}</td>
                <td>{this.props.order.actual_cost}</td>
            </tr>
        );
    }
});

ReactDOM.render(
    <OrderList />,
    document.getElementById('page')
);