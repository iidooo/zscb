var OrderActions = Reflux.createActions(['search']);

var OrderStore = Reflux.createStore({
    listenables: [OrderActions],
    onSearch: function (data) {
        var url = SiteProperties.serverURL + BigDAPI.createNewOrder;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            //location.href = SiteProperties.clientURL + Page.login;
            //return false;
        }

        var self = this;
        var callback = function (result) {
            if (result.status == 200) {
                self.trigger(result.data);
                //sessionStorage.setItem(SessionKey.orderID, result.data.id);
                //location.href = SiteProperties.webURL + Page.bigdOrderDetail;
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    },
});

var Order = React.createClass({
    mixins: [Reflux.connect(OrderStore, 'order')],
    getInitialState: function () {
        return {
            order: {}
        };
    },
    componentDidMount: function () {
    },
    componentWillUpdate(nextProps, nextState){

    },
    componentDidUpdate: function () {
        this.refs.inputOrderDetail.value = JSON.stringify(this.state.order.detail);
    },
    handleSearch: function () {
        this.state.idNumber = this.refs.inputIDNumber.value;
        this.state.name = this.refs.inputName.value;
        this.state.telephone = this.refs.inputTelephone.value;
        this.state.field = this.refs.inputField.value;
        OrderActions.search(this.state);
    },
    render: function () {
        //console.log(this.state.order);
        return (
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuBigDNewOrder"/>

                    <div className="content-page">
                        <Breadcrumb page={Page.bigdNewOrder}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">资信验证查询</div>
                            <div className="panel-body">
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>姓名</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputName"
                                                   defaultValue="王轶贤"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputIDNumber"
                                                   defaultValue="31022919840724043X"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>手机号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputTelephone"
                                                   defaultValue="13816867453"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>查询字段</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputField"
                                                   placeholder="参考接口文档填入字段"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSearch}>查询
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">资信查询结果</div>
                            <div className="panel-body">
                                <textarea ref="inputOrderDetail" className="form-control" rows="10">
                                </textarea>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                </div>

            </div>
        );
    }
});


ReactDOM.render(
    <Order />,
    document.getElementById('page')
);