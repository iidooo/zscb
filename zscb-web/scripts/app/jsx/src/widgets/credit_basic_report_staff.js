/**
 * Created by Ethan on 16/9/19.
 */
var ReportStaff = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="title">三、职业信息</h3>
                <h4 className="sub-title">1、个人社会保险信息</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportSocialSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportSocialMate/>
                    </div>
                </div>

                <h4 className="sub-title">2、个人工作经历</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportExpSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportExpMate/>
                    </div>
                </div>

                <h4 className="sub-title">3、学历信息</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportEduSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportEduMate/>
                    </div>
                </div>

                <h4 className="sub-title">4、个人纳税信息</h4>

                <div className="row">
                    <div className="col-xs-6">
                        <ReportTaxSelf/>
                    </div>
                    <div className="col-xs-6">
                        <ReportTaxMate/>
                    </div>
                </div>
            </div>
        );
    }
});

var ReportSocialSelfActions = Reflux.createActions(['getStaffInfo']);
var ReportSocialSelfStore = Reflux.createStore({
    listenables: [ReportSocialSelfActions],
    onGetStaffInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getStaffInfo;

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
    },
});
var ReportSocialSelf = React.createClass({
    mixins: [Reflux.connect(ReportSocialSelfStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    componentDidMount: function () {
        this.state.idNumber = sessionStorage.getItem(SessionKey.selfIDNumber);
        this.state.dataSource = sessionStorage.getItem(SessionKey.dataSource);
        ReportSocialSelfActions.getStaffInfo(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位名称</th>
                    <td colSpan="3">{this.state.staff.socialCompany}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳状态</th>
                    <td className="col-xs-3">{this.state.staff.socialStatus}</td>
                    <th className="col-xs-3">最后缴纳时间</th>
                    <td className="col-xs-3">{formatDate(this.state.staff.socialLastDate)}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var ReportSocialMateActions = Reflux.createActions(['getStaffInfo']);
var ReportSocialMateStore = Reflux.createStore({
    listenables: [ReportSocialMateActions],
    onGetStaffInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getStaffInfo;

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
    },
});
var ReportSocialMate = React.createClass({
    mixins: [Reflux.connect(ReportSocialMateStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    componentDidMount: function () {
        this.state.idNumber = sessionStorage.getItem(SessionKey.mateIDNumber);
        this.state.dataSource = sessionStorage.getItem(SessionKey.dataSource);
        ReportSocialMateActions.getStaffInfo(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位名称</th>
                    <td colSpan="3">{this.state.staff.socialCompany}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳状态</th>
                    <td className="col-xs-3">{this.state.staff.socialStatus}</td>
                    <th className="col-xs-3">最后缴纳时间</th>
                    <td className="col-xs-3">{formatDate(this.state.staff.socialLastDate)}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var ReportExpSelfActions = Reflux.createActions(['getStaffExpList']);
var ReportExpSelfStore = Reflux.createStore({
    listenables: [ReportExpSelfActions],
    onGetStaffExpList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getStaffExpList;

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
    },
});
var ReportExpSelf = React.createClass({
    mixins: [Reflux.connect(ReportExpSelfStore, 'staffExpList')],
    getInitialState: function () {
        return {
            staffExpList: []
        };
    },
    componentDidMount: function () {
        this.state.idNumber = sessionStorage.getItem(SessionKey.selfIDNumber);
        this.state.dataSource = sessionStorage.getItem(SessionKey.dataSource);
        ReportExpSelfActions.getStaffExpList(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="3" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3 text-center">入职时间</th>
                    <th className="col-xs-3 text-center">离职时间</th>
                    <th className="col-xs-6 text-center">公司名称</th>
                </tr>
                {this.state.staffExpList.map(function (item) {
                    return <ReportExpItemSelf key={item.expID} item={item}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportExpItemSelf = React.createClass({
    render: function () {
        return (
            <tr>
                <td className="text-center">{formatDate(this.props.item.enterDate)}</td>
                <td className="text-center">{formatDate(this.props.item.leaveDate)}</td>
                <td className="text-center">{this.props.item.company}</td>
            </tr>
        );
    }
});

var ReportExpMateActions = Reflux.createActions(['getStaffExpList']);
var ReportExpMateStore = Reflux.createStore({
    listenables: [ReportExpMateActions],
    onGetStaffExpList: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getStaffExpList;

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
    },
});
var ReportExpMate = React.createClass({
    mixins: [Reflux.connect(ReportExpMateStore, 'staffExpList')],
    getInitialState: function () {
        return {
            staffExpList: []
        };
    },
    componentDidMount: function () {
        this.state.idNumber = sessionStorage.getItem(SessionKey.mateIDNumber);
        this.state.dataSource = sessionStorage.getItem(SessionKey.dataSource);
        ReportExpMateActions.getStaffExpList(this.state);
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="3" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3 text-center">入职时间</th>
                    <th className="col-xs-3 text-center">离职时间</th>
                    <th className="col-xs-6 text-center">公司名称</th>
                </tr>
                {this.state.staffExpList.map(function (item) {
                    return <ReportExpItemMate key={item.expID} item={item}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportExpItemMate = React.createClass({
    render: function () {
        return (
            <tr>
                <td className="text-center">{formatDate(this.props.item.enterDate)}</td>
                <td className="text-center">{formatDate(this.props.item.leaveDate)}</td>
                <td className="text-center">{this.props.item.company}</td>
            </tr>
        );
    }
});


var ReportEduSelf = React.createClass({
    mixins: [Reflux.connect(ReportSocialSelfStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">毕业院校</th>
                    <td colSpan="3" className="col-xs-9">{this.state.staff.graduateSchool}</td>
                </tr>
                <tr>
                    <th>最高学位</th>
                    <td colSpan="3">{this.state.staff.highestDegree}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var ReportEduMate = React.createClass({
    mixins: [Reflux.connect(ReportSocialMateStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">毕业院校</th>
                    <td colSpan="3" className="col-xs-9">{this.state.staff.graduateSchool}</td>
                </tr>
                <tr>
                    <th>最高学位</th>
                    <td colSpan="3">{this.state.staff.highestDegree}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});


var ReportTaxSelf = React.createClass({
    mixins: [Reflux.connect(ReportSocialSelfStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位名称</th>
                    <td colSpan="3">{this.state.staff.taxCompany}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳状态</th>
                    <td className="col-xs-3">{this.state.staff.taxStatus}</td>
                    <th className="col-xs-3">最后缴纳时间</th>
                    <td className="col-xs-3">{formatDate(this.state.staff.taxLastDate)}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var ReportTaxMate = React.createClass({
    mixins: [Reflux.connect(ReportSocialMateStore, 'staff')],
    getInitialState: function () {
        return {
            staff: {}
        };
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位名称</th>
                    <td colSpan="3">{this.state.staff.taxCompany}</td>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳状态</th>
                    <td className="col-xs-3">{this.state.staff.taxStatus}</td>
                    <th className="col-xs-3">最后缴纳时间</th>
                    <td className="col-xs-3">{formatDate(this.state.staff.taxLastDate)}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});