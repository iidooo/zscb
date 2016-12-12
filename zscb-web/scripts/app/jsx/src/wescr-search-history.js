var SearchHistoryActions = Reflux.createActions(['getIdentityList']);

var SearchHistoryStore = Reflux.createStore({
    listenables: [SearchHistoryActions],
    onGetIdentityList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getIdentityList;

        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.dataSource = "wescr";

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

var SearchHistory = React.createClass({
    mixins: [Reflux.connect(SearchHistoryStore, 'identityData')],
    getInitialState: function () {
        return {
            identityData: {
                page: {},
                identityList: []
            }
        };
    },
    componentDidMount: function () {
        SearchHistoryActions.getIdentityList(this.state);
    },
    onChildChanged: function (childState) {
        if (childState.currentPage != null) {
            this.state.currentPage = childState.currentPage;

            SearchHistoryActions.searchSiteUserList(this.state);
        }
    },
    handleSearch: function () {
        this.state.loginID = this.refs.inputLoginID.value;
        this.state.userName = this.refs.inputUserName.value;
        this.state.sex = this.refs.inputSex.value;
        this.state.mobile = this.refs.inputMobile.value;
        this.state.email = this.refs.inputEmail.value;
        this.state.weixinID = this.refs.inputWeixinID.value;
        SearchHistoryActions.searchSiteUserList(this.state);
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuWescrCreditSearchHistory"/>

                    <div className="content-page">
                        <ol className="breadcrumb">
                            <li><a href="#">系统管理</a></li>
                            <li><a href="#">维氏盾</a></li>
                            <li className='active'>资信查询历史</li>
                        </ol>

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
                                        <button type="button" className="btn btn-primary" onClick={this.handleSearch}>
                                            查&nbsp;询
                                        </button>
                                    </div>
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
                    <th>借款人姓名</th>
                    <th>借款人证件号</th>
                    <th>配偶姓名</th>
                    <th>配偶证件号</th>
                    <th>查询时间</th>
                    <th>操作</th>
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
    handleLink: function (selfIDNumber, mateIDNumber) {
        sessionStorage.setItem(SessionKey.selfIDNumber, selfIDNumber);
        sessionStorage.setItem(SessionKey.mateIDNumber, mateIDNumber);
        sessionStorage.setItem(SessionKey.dataSource, "wescr");
        location.href = SiteProperties.webURL + Page.wescrCreditReport;
    },
    render: function () {
        var mateName = "";
        if (this.props.identity.mate != null && this.props.identity.mate.name != null) {
            mateName = this.props.identity.mate.name;
        }

        var mateIDNumber = "";
        if (this.props.identity.mate != null && this.props.identity.mate.idnumber != null) {
            mateIDNumber = this.props.identity.mate.idnumber;
        }
        return (
            <tr>
                <td>{this.props.identity.name}</td>
                <td>{this.props.identity.idnumber}</td>
                <td>{mateName}</td>
                <td>{mateIDNumber}</td>
                <td>{new Date(this.props.identity.createTime).format('yyyy-MM-dd hh:mm:ss')}</td>
                <td>
                    <a href="javascript:void(0)"
                       onClick={this.handleLink.bind(null, this.props.identity.idnumber, mateIDNumber)}>查看报告</a>
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SearchHistory />,
    document.getElementById('page')
);