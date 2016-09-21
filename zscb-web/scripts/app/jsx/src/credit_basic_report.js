var CreditReportActions = Reflux.createActions(['search']);

var CreditReportStore = Reflux.createStore({
    listenables: [CreditReportActions],
    onSearch: function (data) {
        var url = SiteProperties.serverURL + API.searchCommentList;
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

var CreditReport = React.createClass({
    mixins: [Reflux.connect(CreditReportStore, 'commentsData')],
    getInitialState: function () {
        return {
            order: {
                details: []
            }
        };
    },
    componentDidMount: function () {
        //CreditReportActions.search(this.state.searchCondition);
    },
    render: function () {
        var detailSelf = {};
        var detailMate = {};
        if (this.state.order != null && this.state.order.details.length > 0) {
            detailSelf = this.state.order.details[0];
            if (this.state.order.details.length >= 2) {
                detailMate = this.state.order.details[1];
            }
        }
        return (
            <div>
                <Header activeMenuID="mainMenuBussinessManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuBussinessManage" activeMenuID="sideMenuCreditSearchHistory"/>

                    <div className="content-page">
                        <Breadcrumb page={Page.creditBasicReport}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-6">资信验证基础报告</div>
                                    <div className="col-xs-6 text-right">
                                        <button type="button" className="btn btn-primary">下载报告</button>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <ReportIdentity/>

                                <ReportRegister/>

                                <ReportStaff/>

                                <ReportBussiness/>

                                <ReportAsset/>

                                <ReportDebt/>

                                <ReportIncome/>

                                <ReportLegal/>

                                <ReportPawn/>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                </div>

            </div>
        );
    }
});


var ReportAbstractSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">一，身份</th>
                </tr>
                <tr>
                    <th className="col-xs-3">姓名</th>
                    <td className="col-xs-3">{this.props.detail.name}</td>
                    <th className="col-xs-3">籍贯</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>学历</th>
                    <td></td>
                    <th>关联手机数</th>
                    <td></td>
                </tr>
                <tr>
                    <th>婚姻</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>固定居所</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>联网核查结果</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">二，职业</th>
                </tr>
                <tr>
                    <th>单位</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>缴金状态</th>
                    <td></td>
                    <th>收入区间</th>
                    <td></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">三，财产</th>
                </tr>
                <tr>
                    <th>房产</th>
                    <td></td>
                    <th>车辆</th>
                    <td></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">四，信用卡逾期</th>
                </tr>
                <tr>
                    <th>逾期记录</th>
                    <td></td>
                    <th>黑名单</th>
                    <td></td>
                </tr>
                <tr>
                    <th>航空记录</th>
                    <td></td>
                    <th>外宿记录</th>
                    <td></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">五，违法记录</th>
                </tr>
                <tr>
                    <td colSpan="4" className="text-center">0条</td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">六，司法记录</th>
                </tr>
                <tr>
                    <td colSpan="4" className="text-center">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var ReportAbstractMate = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">一，身份</th>
                </tr>
                <tr>
                    <th className="col-xs-3">姓名</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">籍贯</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>学历</th>
                    <td></td>
                    <th>关联手机数</th>
                    <td></td>
                </tr>
                <tr>
                    <th>婚姻</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>固定居所</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>联网核查结果</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">二，职业</th>
                </tr>
                <tr>
                    <th>单位</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>缴金状态</th>
                    <td></td>
                    <th>收入区间</th>
                    <td></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">三，财产</th>
                </tr>
                <tr>
                    <th>房产</th>
                    <td></td>
                    <th>车辆</th>
                    <td></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">四，信用卡逾期</th>
                </tr>
                <tr>
                    <th>逾期记录</th>
                    <td></td>
                    <th>黑名单</th>
                    <td></td>
                </tr>
                <tr>
                    <th>航空记录</th>
                    <td></td>
                    <th>外宿记录</th>
                    <td></td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">五，违法记录</th>
                </tr>
                <tr>
                    <td colSpan="4" className="text-center">0条</td>
                </tr>
                <tr>
                    <th colSpan="4" className="text-center">六，司法记录</th>
                </tr>
                <tr>
                    <td colSpan="4" className="text-center">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});


ReactDOM.render(
    <CreditReport />,
    document.getElementById('page')
);