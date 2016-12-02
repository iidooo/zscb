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

var AccountInfo = React.createClass({
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
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuBigDAccountInfo"/>

                    <div className="content-page">
                        <Breadcrumb page={Page.bigdAccountInfo}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">用户信息</div>
                            <div className="panel-body">
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>用户ID</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.id}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>用户名</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.username}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>真实名称</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.detail.real_name} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>当前账户余额</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.balance}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>已经消费的金额</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.blocked_fund} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>折扣率</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.detail.discount} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>用户类型</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.user_type}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>锁定状态</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.status}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>权限角色</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.roles}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>管理员权限</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.is_super_admin} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>公司名称</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.detail.enterprise} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>邮箱地址</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.email}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>电话号码</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.detail.telephone} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>联系电话</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.phone}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>QQ</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control" value={this.state.account.detail.qq}
                                               disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>性别</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.detail.sex} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>创建账户时间</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" className="form-control"
                                               value={this.state.account.create_time} disabled="disabled"/>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-2 control-label">
                                        <label>备注</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <textarea className="form-control"
                                               value={this.state.account.detail.remark} disabled="disabled"></textarea>
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

ReactDOM.render(
    <AccountInfo/>,
    document.getElementById('page')
);