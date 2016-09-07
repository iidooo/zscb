var OrderListActions = Reflux.createActions(['search']);

var OrderListStore = Reflux.createStore({
    listenables: [OrderListActions],
    onSearch: function (data) {
        var url = SiteProperties.serverURL + API.searchContentList;
        data.accessKey = SecurityClient.accessKey;
        data.accessSecret = SecurityClient.accessSecret;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.siteID = sessionStorage.getItem(SessionKey.siteID);

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.clientURL + Page.login;
            return false;
        }

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

var OrderList = React.createClass({
    mixins: [Reflux.connect(OrderListStore, 'contentsData')],
    getInitialState: function () {
        return {
            searchCondition:{
                channelID: 0
            },
            contentsData: {
                page: {},
                contentList: []
            }
        };
    },
    componentDidMount(){
        $('.form_date').datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            format: 'yyyy-mm-dd'
        });
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuBigD"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMenuID="sideMenuBigDOrderHistory"/>
                    <div className="content-page">
                        <Breadcrumb page={Page.bigdOrderList}/>
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
                        <OrderListTable contentList={this.state.contentsData.contentList}/>

                        <Pager callbackParent={this.onChildChanged}
                               recordSum={this.state.contentsData.page.recordSum}
                               currentPage={this.state.contentsData.page.currentPage}
                               pageSum={this.state.contentsData.page.pageSum}/>

                        <Footer/>

                    </div>
                </div>

            </div>
        );
    }
});

var OrderListTable = React.createClass({
    render: function () {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>栏目</th>
                    <th className="width-400">标题</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>发布者</th>
                    <th>发布时间</th>
                    <th>更新时间</th>
                </tr>
                </thead>
                <tbody>
                {this.props.contentList.map(function (item) {
                    return <OrderListTableRow key={item.contentID} content={item}/>
                })}
                </tbody>
            </table>
        );
    }
});

var OrderListTableRow = React.createClass({
    handleLink: function (contentID) {
        sessionStorage.setItem(SessionKey.contentID, contentID);
        location.href = SiteProperties.clientURL + Page.content;
    },
    render: function () {
        return (
            <tr onClick={this.handleLink.bind(null, this.props.content.contentID)}>
                <td>{this.props.content.channel.channelName}</td>
                <td><a href="javascript:void(0)" onClick={this.handleLink.bind(null, this.props.content.contentID)}>{this.props.content.contentTitle}</a></td>
                <td>{ContentTypeMap[this.props.content.contentType]}</td>
                <td>{ContentStatusMap[this.props.content.status]}</td>
                <td>{this.props.content.createUser.userName}</td>
                <td>{new Date(this.props.content.createTime).format('yyyy-MM-dd hh:mm:ss')}</td>
                <td>{new Date(this.props.content.updateTime).format('yyyy-MM-dd hh:mm:ss')}</td>
            </tr>
        );
    }
});

ReactDOM.render(
    <OrderList />,
    document.getElementById('page')
);