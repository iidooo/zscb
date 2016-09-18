var CreditSearchActions = Reflux.createActions(['getCreditSearch', 'updateCreditSearch']);

var CreditSearchStore = Reflux.createStore({
    listenables: [CreditSearchActions],
    onGetCreditSearch: function (data) {
        var url = CreditSearchProperties.serverURL + API.getCreditSearch;

        data.accessKey = SecurityClient.accessKey;
        data.accessSecret = SecurityClient.accessSecret;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.siteID = sessionStorage.getItem(SessionKey.siteID);
        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = CreditSearchProperties.clientURL + Page.login;
            return false;
        }

        var self = this;
        var callback = function (result) {
            if (result.status == 200) {
                self.trigger(result.data);
            }
        };

        ajaxPost(url, data, callback);
    },
    onUpdateCreditSearch: function (data) {
        var url = CreditSearchProperties.serverURL + API.updateCreditSearch;

        data.accessKey = SecurityClient.accessKey;
        data.accessSecret = SecurityClient.accessSecret;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.siteID = sessionStorage.getItem(SessionKey.siteID);
        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = CreditSearchProperties.clientURL + Page.login;
            return false;
        }

        var self = this;
        var callback = function (result) {
            if (result.status == 200) {
                alert(Message.SAVE_SUCCESS);
                self.trigger(result.data);
            }
        };

        ajaxPost(url, data, callback);
    },
});

var CreditSearch = React.createClass({
    mixins: [Reflux.connect(CreditSearchStore, 'site')],
    getInitialState: function () {
        return {
            site: {}
        };
    },
    componentDidMount: function () {
        //CreditSearchActions.getCreditSearch(this.state);
    },
    componentDidUpdate: function () {
        //this.refs.inputCreditSearchCode.value = this.state.site.siteCode;
        //this.refs.inputCreditSearchName.value = this.state.site.siteName;
        //this.refs.inputCreditSearchURL.value = this.state.site.siteURL;
        //this.refs.inputRemarks.value = this.state.site.remarks;
    },
    handleSearch: function () {
        location.href = SiteProperties.webURL + Page.creditBasicReport;
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuBussinessManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuBussinessManage" activeMenuID="sideMenuCreditSearch"/>

                    <div className="content-page">
                        <Breadcrumb page={Page.creditSearch}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">借款人信息录入</div>
                            <div className="panel-body">
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>借款人</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputSelfName"
                                                   defaultValue="王轶贤"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputSelfIDNumber"
                                                   defaultValue="31022919840724043X"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>手机号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputSelfTelephone"
                                                   defaultValue="13816867453"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>银行卡</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputSelfBankCard"
                                                   defaultValue="4367421217534261136"/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>配偶</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputMateName"
                                                   defaultValue="陶雅芳"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputMateIDNumber"
                                                   defaultValue="310107198408172543"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>手机号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputMateTelephone"
                                                   defaultValue="13512177378"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>银行卡</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputMateBankCard"/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>房产证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputHouseNo"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>地址</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputHouseAddress"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>面积</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputHouseArea"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>其他抵押人1</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputHouseOwner1"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputHouseOwner1ID"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                        </div>
                                        <div className="col-xs-8">
                                            <button type="button" className="btn btn-info">新增其他抵押人</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSearch}>查询
                                    </button>
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
    <CreditSearch />,
    document.getElementById('page')
);