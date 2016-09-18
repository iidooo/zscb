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

var Order = React.createClass({displayName: "Order",
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
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuBigDNewOrder"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.bigdNewOrder}), 

                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "资信验证查询"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "姓名")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", ref: "inputName", 
                                                   defaultValue: "王轶贤"})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "身份证")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", ref: "inputIDNumber", 
                                                   defaultValue: "31022919840724043X"})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "手机号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", ref: "inputTelephone", 
                                                   defaultValue: "13816867453"})
                                        )
                                    )
                                ), 

                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "查询字段")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", ref: "inputField", 
                                                   placeholder: "参考接口文档填入字段"})
                                        )
                                    )
                                ), 

                                React.createElement("div", {className: "text-right"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.handleSearch}, "查询"
                                    )
                                )
                            )
                        ), 

                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "资信查询结果"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("textarea", {ref: "inputOrderDetail", className: "form-control", rows: "10"}
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


ReactDOM.render(
    React.createElement(Order, null),
    document.getElementById('page')
);