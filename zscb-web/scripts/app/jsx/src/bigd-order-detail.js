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

var OrderDetail = React.createClass({
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
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuBigDOrderHistory"/>

                    <div className="content-page">
                        <Breadcrumb page={Page.bigdOrderDetail}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">资信查询详细说明</div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderDetailSelf detail={detailSelf}/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderDetailMate detail={detailMeta}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                </div>

            </div>
        );
    }
});


var OrderDetailSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-1">序号</th>
                    <th className="col-xs-3">描述</th>
                    <th className="col-xs-3">标签名称</th>
                    <th className="col-xs-3">查询参数</th>
                    <th className="col-xs-2">查询结果</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>手机号与姓名是否匹配</td>
                    <td>tn_is_match</td>
                    <td>{this.props.detail.telephone} , {this.props.detail.name}</td>
                    <td>{this.props.detail.result.tn_is_match}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>登记人身份证与姓名是否匹配</td>
                    <td>idn_is_match</td>
                    <td>{this.props.detail.id_number} , {this.props.detail.name}</td>
                    <td>{this.props.detail.result.idn_is_match}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>手机号和身份证是否匹配</td>
                    <td>tid_is_match</td>
                    <td>{this.props.detail.telephone} , {this.props.detail.id_number}</td>
                    <td>{this.props.detail.result.tid_is_match}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>手机号、姓名、身份证是否匹配</td>
                    <td>tnid_is_match</td>
                    <td>{this.props.detail.telephone} , {this.props.detail.id_number}, {this.props.detail.name}</td>
                    <td>{this.props.detail.result.tnid_is_match}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>年龄层次</td>
                    <td>age</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.age}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>性别</td>
                    <td>sex</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.sex}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>终端厂家</td>
                    <td>terminal_manufacturers</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.terminal_manufacturers}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>终端机型</td>
                    <td>terminal_model</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.terminal_model}</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>操作系统</td>
                    <td>operating_system</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.operating_system}</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>手机入网时间</td>
                    <td>in_date</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.in_date}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var OrderDetailMate = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-1">序号</th>
                    <th className="col-xs-3">描述</th>
                    <th className="col-xs-3">标签名称</th>
                    <th className="col-xs-3">查询参数</th>
                    <th className="col-xs-2">查询结果</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>手机号与姓名是否匹配</td>
                    <td>tn_is_match</td>
                    <td>{this.props.detail.telephone} , {this.props.detail.name}</td>
                    <td>{this.props.detail.result.tn_is_match}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>登记人身份证与姓名是否匹配</td>
                    <td>idn_is_match</td>
                    <td>{this.props.detail.id_number} , {this.props.detail.name}</td>
                    <td>{this.props.detail.result.idn_is_match}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>手机号和身份证是否匹配</td>
                    <td>tid_is_match</td>
                    <td>{this.props.detail.telephone} , {this.props.detail.id_number}</td>
                    <td>{this.props.detail.result.tid_is_match}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>手机号、姓名、身份证是否匹配</td>
                    <td>tnid_is_match</td>
                    <td>{this.props.detail.telephone} , {this.props.detail.id_number}, {this.props.detail.name}</td>
                    <td>{this.props.detail.result.tnid_is_match}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>年龄层次</td>
                    <td>age</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.age}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>性别</td>
                    <td>sex</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.sex}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>终端厂家</td>
                    <td>terminal_manufacturers</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.terminal_manufacturers}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>终端机型</td>
                    <td>terminal_model</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.terminal_model}</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>操作系统</td>
                    <td>operating_system</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.operating_system}</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>手机入网时间</td>
                    <td>in_date</td>
                    <td>{this.props.detail.telephone}</td>
                    <td>{this.props.detail.result.in_date}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

ReactDOM.render(
    <OrderDetail />,
    document.getElementById('page')
);