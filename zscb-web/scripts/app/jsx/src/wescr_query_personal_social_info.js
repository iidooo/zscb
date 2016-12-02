var PageActions = Reflux.createActions(['queryPersonalSocialInfo']);

var PageStore = Reflux.createStore({
    listenables: [PageActions],
    queryPersonalSocialInfo: function (data) {
        var url = SiteProperties.serverURL + WescrAPI.queryPersonalSocialInfo;
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
    mixins: [Reflux.connect(PageStore, 'resultData')],
    getInitialState: function () {
        return {
            idNumber: "310108197202134025",
            name: "刘黎霖",
            mobile: "13621790399",
            resultData: ""
        };
    },
    handleChange: function (name, event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    },
    handleSearch: function () {
        this.setState({resultData: ""});
        PageActions.queryPersonalSocialInfo(this.state);
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuWescrQueryPersonalSocialInfo"/>

                    <div className="content-page">
                        <ol className="breadcrumb">
                            <li><a href="#">系统管理</a></li>
                            <li><a href="#">维氏盾</a></li>
                            <li className='active'>个人社保信息</li>
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
                                        <div className="col-xs-3 control-label">
                                            <label>手机号</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <input type="text" className="form-control" value={this.state.mobile}
                                                   onChange={this.handleChange.bind(this,"mobile")}/>
                                        </div>
                                        <div className="col-xs-3">
                                            <button type="button" className="btn btn-primary"
                                                    onClick={this.handleSearch}>
                                                查询
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SearchResult resultData={this.state.resultData}/>
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
            resultData: {}
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
                    <textarea className="form-control" rows="10" value={this.props.resultData}
                              onChange={this.handleChange.bind(this,"resultData")}></textarea>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <PageContent />,
    document.getElementById('page')
);