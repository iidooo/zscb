var ReportPawnActions = Reflux.createActions(['getPawnInfo']);
var ReportPawnStore = Reflux.createStore({
    listenables: [ReportPawnActions],
    onGetPawnInfo: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.getPawnInfo;

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
var ReportPawn = React.createClass({
    mixins: [Reflux.connect(ReportPawnStore, 'pawn')],
    getInitialState: function () {
        return {
            pawn: {}
        };
    },
    componentDidMount: function () {
        this.state.identityID = sessionStorage.getItem(SessionKey.selfIdentityID);
        ReportPawnActions.getPawnInfo(this.state);
    },
    render: function () {
        return (
        <div>
            <h3 className="title">九、抵押物信息</h3>
            <h4 className="sub-title">1、抵押物</h4>

            <div className="row">
                <div className="col-xs-12">
                    <table className="table table-bordered table-condensed table_inline">
                        <tbody>
                        <tr>
                            <th className="col-xs-2">产证号</th>
                            <td className="col-xs-4 text-center">产调</td>
                            <th className="col-xs-2">价值</th>
                            <td className="col-xs-4 text-center">{this.state.pawn.houseWorth} 万元（评估报告）</td>
                        </tr>
                        <tr>
                            <th className="col-xs-2">房龄</th>
                            <td className="col-xs-4 text-center">{this.state.pawn.houseAge}</td>
                            <th className="col-xs-2">户口数</th>
                            <td className="col-xs-4 text-center">{this.state.pawn.registerNum}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h4 className="sub-title">2、抵押人</h4>

            <div className="row">
                <div className="col-xs-12">
                    <ReportPeopleList/>
                </div>
            </div>
        </div>

        );
    }
});

var ReportPeopleList = React.createClass({
    mixins: [Reflux.connect(ReportPawnStore, 'pawn')],
    getInitialState: function () {
        return {
            pawn: {
                peopleList: []
            }
        };
    },
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                {this.state.pawn.peopleList.map(function (item, index) {
                    return <ReportPeopleListItem key={item.peopleID} item={item} index={index}/>
                })}
                </tbody>
            </table>
        );
    }
});
var ReportPeopleListItem = React.createClass({
    render: function () {
        var isMatch = "";
        if(this.props.item.isMatch){
            isMatch = "一致";
        } else {
            isMatch = "非一致";
        }

        return (
            <tr>
                <th className="col-xs-2">抵押人 {this.props.index + 1}</th>
                <td className="col-xs-2">{this.props.item.name}</td>
                <th className="col-xs-2">身份证号</th>
                <td className="col-xs-2">{this.props.item.idnumber}</td>
                <th className="col-xs-2">身份验证</th>
                <td className="col-xs-2">{isMatch}</td>
            </tr>
        );
    }
});
