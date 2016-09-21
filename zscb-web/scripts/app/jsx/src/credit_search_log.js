var SearchLogActions = Reflux.createActions(['getIdentityList']);

var SearchLogStore = Reflux.createStore({
    listenables: [SearchLogActions],
    onGetIdentityList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIdentityList;

        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.webURL + Page.login;
            return false;
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
    }
});

var SearchLog = React.createClass({
    mixins: [Reflux.connect(SearchLogStore, 'identityData')],
    getInitialState: function () {
        return {
            identityData: {
                page: {},
                identityList: []
            }
        };
    },
    componentDidMount: function () {
        SearchLogActions.getIdentityList(this.state);
    },
    onChildChanged: function (childState) {
        if (childState.currentPage != null) {
            this.state.currentPage = childState.currentPage;

            SearchLogActions.searchSiteUserList(this.state);
        }
    },
    handleSearch: function(){
        this.state.loginID = this.refs.inputLoginID.value;
        this.state.userName = this.refs.inputUserName.value;
        this.state.sex = this.refs.inputSex.value;
        this.state.mobile = this.refs.inputMobile.value;
        this.state.email = this.refs.inputEmail.value;
        this.state.weixinID = this.refs.inputWeixinID.value;
        SearchLogActions.searchSiteUserList(this.state);
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuBussinessManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuBussinessManage" activeMenuID="sideMenuCreditSearchLog"/>
                    <div className="content-page">
                        <Breadcrumb page={Page.creditSearchLog}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">查询条件</div>
                            <div className="panel-body">
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>姓名</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputName"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputIDNumber"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>手机号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" ref="inputMobile"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSearch}>查&nbsp;询</button>
                                </div>
                            </div>
                        </div>

                        <IdentityDataTable identityList={this.state.identityData.identityList}/>

                        <Pager callbackParent={this.onChildChanged}
                               recordSum={this.state.identityData.page.recordSum}
                               currentPage={this.state.identityData.page.currentPage}
                               pageSum={this.state.identityData.page.pageSum}/>

                        <Footer/>
                    </div>
                </div>

            </div>
        );
    }
});

var IdentityDataTable = React.createClass({
    render: function () {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>操作员</th>
                    <th>操作时间</th>
                    <th>姓名</th>
                    <th>证件号</th>
                    <th>手机号</th>
                </tr>
                </thead>
                <tbody>
                {this.props.identityList.map(function (item) {
                    return <IdentityTableRow key={item.identityID} identity={item}/>
                })}
                </tbody>
            </table>
        );
    }
});

var IdentityTableRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.identity.createUser.userName}</td>
                <td>{new Date(this.props.identity.createTime).format('yyyy-MM-dd hh:mm:ss')}</td>
                <td>{this.props.identity.name}</td>
                <td>{this.props.identity.idnumber}</td>
                <td>{this.props.identity.mobile}</td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SearchLog />,
    document.getElementById('page')
);