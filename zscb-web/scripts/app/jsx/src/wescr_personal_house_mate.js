var PageActions = Reflux.createActions(['getPersonalHouseMate']);

var PageStore = Reflux.createStore({
    listenables: [PageActions],
    getPersonalHouseMate: function (data) {
        var url = SiteProperties.serverURL + WescrAPI.getPersonalHouseMate;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.webURL + Page.login;
            return false;
        }

        var self = this;
        var callback = function (result) {


            if (result.status == 200) {
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    }
});

var PageContent = React.createClass({
    mixins: [Reflux.connect(PageStore, 'personalHouseMate')],
    getInitialState: function () {
        return {
            idNumber: "33020619730129061X",
            name: "王旭军",
            personalHouseMate: ""
        };
    },
    handleChange: function (name, event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    },
    handleSearch: function () {
        this.setState({personalHouseMate: ""});
        PageActions.getPersonalHouseMate(this.state);
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuWescrPersonalHouseMate"/>

                    <div className="content-page">
                        <ol className="breadcrumb">
                            <li><a href="#">系统管理</a></li>
                            <li><a href="#">维氏盾</a></li>
                            <li className='active'>个人户籍及同住人信息</li>
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
                                            <input type="text" className="form-control" value={this.state.name}
                                                   onChange={this.handleChange.bind(this,"name")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.idNumber}
                                                   onChange={this.handleChange.bind(this,"idNumber")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <button type="button" className="btn btn-primary" onClick={this.handleSearch}>
                                            查询
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SearchResult personalHouseMate={this.state.personalHouseMate}/>
                        <Footer/>

                    </div>
                </div>

            </div>
        );
    }
});

var SearchResult = React.createClass({
    getInitialState: function () {
        return {
            personalHouseMate: {}
        };
    },
    handleChange: function (event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    },
    render: function () {
        return (

            <div className="panel panel-info">
                <div className="panel-heading">查询结果</div>
                <div className="panel-body">
                    <textarea className="form-control" rows="10" value={this.props.personalHouseMate}
                              onChange={this.handleChange.bind(this,"personalHouseMate")}></textarea>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <PageContent />,
    document.getElementById('page')
);