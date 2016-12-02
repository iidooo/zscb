var AccountInfoActions = Reflux.createActions(['getAccountInfo']);

var AccountInfoStore = Reflux.createStore({
    listenables: [AccountInfoActions],
    onGetAccountInfo: function (data) {

        var url = SiteProperties.serverURL + BigDAPI.getAccountInfo;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            //location.href = SiteProperties.webURL + Page.login;
            //return false;
        }

        var self = this;

        var callback = function (result) {
            console.log(result.data);
            if (result.status == 200) {
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    },
});

var AccountInfo = React.createClass({displayName: "AccountInfo",
    mixins: [Reflux.connect(AccountInfoStore, 'account')],
    getInitialState: function () {
        return {
            account: {
                detail: {}
            }
        };
    },
    componentDidMount: function () {
        AccountInfoActions.getAccountInfo(this.state);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuBigDAccountInfo"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.bigdAccountInfo}), 

                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "用户信息"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "用户ID")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.id, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "用户名")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.username, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "真实名称")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.detail.real_name, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "当前账户余额")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.balance, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "已经消费的金额")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.blocked_fund, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "折扣率")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.detail.discount, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "用户类型")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.user_type, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "锁定状态")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.status, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "权限角色")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.roles, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "管理员权限")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.is_super_admin, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "公司名称")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.detail.enterprise, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "邮箱地址")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.email, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "电话号码")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.detail.telephone, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "联系电话")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.phone, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "QQ")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", value: this.state.account.detail.qq, 
                                               disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "性别")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.detail.sex, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "创建账户时间")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("input", {type: "text", className: "form-control", 
                                               value: this.state.account.create_time, disabled: "disabled"})
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-2 control-label"}, 
                                        React.createElement("label", null, "备注")
                                    ), 
                                    React.createElement("div", {className: "col-xs-10"}, 
                                        React.createElement("textarea", {className: "form-control", 
                                               value: this.state.account.detail.remark, disabled: "disabled"})
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

ReactDOM.render(
    React.createElement(AccountInfo, null),
    document.getElementById('page')
);