var PageActions = Reflux.createActions(['getPersonBadInfo']);

var PageStore = Reflux.createStore({
    listenables: [PageActions],
    getPersonBadInfo: function (data) {
        var url = SiteProperties.serverURL + WescrAPI.getPersonBadInfo;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);

        // 检查token是否过期
        //if (data.accessToken == null || data.accessToken == "") {
        //    location.href = SiteProperties.clientURL + Page.login;
        //    return false;
        //}

        var self = this;
        var callback = function (result) {

            //console.log(result.data);
            if (result.status == 200) {
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    }
});

var Page = React.createClass({
    mixins: [Reflux.connect(PageStore, 'personBadInfo')],
    getInitialState: function () {
        return {
            personBadInfo: {
            }
        };
    },
    componentDidMount(){
        PageActions.getPersonBadInfo(this.state);
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuSysManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuSysManage" activeMenuID="sideMenuWescrPersonBadInfo"/>
                    <div className="content-page">
                        <Breadcrumb page={Page.wescrPersonalBadInfo}/>
                        <div className="panel panel-default">
                            <div className="panel-heading">查询条件</div>
                            <div className="panel-body">
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>开始时间</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <div className="input-group date form_date" data-date=""
                                                 data-date-format="yyyy-mm-dd"
                                                 data-link-field="startDate" data-link-format="yyyy-mm-dd">
                                                <input id="startDate" className="form-control" type="text"
                                                       ref="inputStartDate"
                                                       readonly/>
                                                <span className="input-group-addon">
                                                    <span className="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>结束时间</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <div className="input-group date form_date" data-date=""
                                                 data-date-format="yyyy-mm-dd"
                                                 data-link-field="endDate" data-link-format="yyyy-mm-dd">
                                                <input id="endDate" className="form-control" type="text" ref="inputEndDate"
                                                       readonly/>
                                                <span className="input-group-addon">
                                                    <span className="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <button type="button" className="btn btn-primary">查询</button>
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
    <Page />,
    document.getElementById('page')
);