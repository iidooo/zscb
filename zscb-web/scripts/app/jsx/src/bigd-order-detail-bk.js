/**
 * Created by Ethan on 16/5/20.
 */

var OrderActions = Reflux.createActions(['getOrder']);

var OrderStore = Reflux.createStore({
    listenables: [OrderActions],
    onGetOrder: function (data) {
        var url = SiteProperties.serverURL + BigDAPI.getOrder;
        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.id = sessionStorage.getItem(SessionKey.orderID);
        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            //location.href = SiteProperties.clientURL + Page.login;
            //return false;
        }

        var self = this;
        var callback = function (result) {
            if (result.status == 200) {
                //console.log(result.data.details);
                self.trigger(result.data);
            } else {
                console.log(result);
            }
        };

        ajaxPost(url, data, callback);
    },
});

var Order = React.createClass({
    mixins: [Reflux.connect(OrderStore, 'order')],
    getInitialState: function () {
        return {
            order: {
                details: []
            }
        };
    },
    componentDidMount: function () {
        OrderActions.getOrder(this.state);
    },
    render: function () {
        var detailSelf = {};
        var detailMeta = {};
        if(this.state.order != null && this.state.order.details.length > 0){
            detailSelf = this.state.order.details[0];
            if(this.state.order.details.length >= 2) {
                detailMeta = this.state.order.details[1];
            }
        }
        console.log(detailSelf);
        console.log(detailMeta);
        return (
            <div>
                <Header activeMenuID="mainMenuBigD"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMenuID="sideMenuBigDOrderHistory"/>

                    <div className="content-page">
                        <Breadcrumb page={Page.bigdOrderDetail}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">资信查询详细说明</div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderAbstractSelf detail={detailSelf}/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderAbstractMeta detail={detailMeta}/>
                                    </div>
                                </div>
                                <h3 className="title">一、身份信息</h3>
                                <h4 className="sub-title">基础信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderIdentityBasicSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderIdentityBasicMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">户籍信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderIdentityRegistrySelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderIdentityRegistryMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">学历信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderIdentityEducationSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderIdentityEducationMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">居所</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderIdentityAddressSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderIdentityAddressMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">联系方式</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderIdentityConnectSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderIdentityConnectMeta/>
                                    </div>
                                </div>
                                <h3 className="title">二、职业信息</h3>
                                <h4 className="sub-title">个人社会保险信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderStuffSocialSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderStuffSocialMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">个人公积金信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderStuffFundSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderStuffFundMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">个人工作经历</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderStuffExpSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderStuffExpMeta/>
                                    </div>
                                </div>
                                <h3 className="title">三、财产信息</h3>
                                <h4 className="sub-title">房产信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderAssetHouseSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderAssetHouseMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">车辆信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderAssetCarSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderAssetCarMeta/>
                                    </div>
                                </div>
                                <h3 className="title">四、信用卡逾期</h3>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderCreditExpireSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderCreditExpireMeta/>
                                    </div>
                                </div>
                                <h3 className="title">五、违法记录</h3>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderLawBreakSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderLawBreakMeta/>
                                    </div>
                                </div>
                                <h3 className="title">六、司法记录</h3>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderJusticeSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderJusticeMeta/>
                                    </div>
                                </div>
                                <h4 className="sub-title">黑名单信息</h4>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <OrderBlackListSelf/>
                                    </div>
                                    <div className="col-xs-6">
                                        <OrderBlackListMeta/>
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

var OrderAbstractSelf = React.createClass({
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
var OrderAbstractMeta = React.createClass({
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


/*身份基本信息*/
var OrderIdentityBasicSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">姓名</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">性别</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>身份证号</th>
                    <td></td>
                    <th>出生年月</th>
                    <td></td>
                </tr>
                <tr>
                    <th>验证结果</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderIdentityBasicMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">姓名</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">性别</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>身份证号</th>
                    <td></td>
                    <th>出生年月</th>
                    <td></td>
                </tr>
                <tr>
                    <th>验证结果</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*户籍信息*/
var OrderIdentityRegistrySelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">籍贯</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">出生地</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>户籍</th>
                    <td></td>
                    <th>民族</th>
                    <td></td>
                </tr>
                <tr>
                    <th>婚姻</th>
                    <td></td>
                    <th>曾用名</th>
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderIdentityRegistryMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">籍贯</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">出生地</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>户籍</th>
                    <td></td>
                    <th>民族</th>
                    <td></td>
                </tr>
                <tr>
                    <th>婚姻</th>
                    <td></td>
                    <th>曾用名</th>
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*学历信息*/
var OrderIdentityEducationSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">毕业院校</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>毕业时间</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>学历</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>学位</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderIdentityEducationMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">毕业院校</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>毕业时间</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>学历</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th>学位</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*居所*/
var OrderIdentityAddressSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">固定居所</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderIdentityAddressMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">固定居所</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*联系方式*/
var OrderIdentityConnectSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">配对手机号码数</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th className="col-xs-3">手机号码</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">实名认证</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>手机入网时长</th>
                    <td></td>
                    <th>上个月通话时长</th>
                    <td></td>
                </tr>
                <tr>
                    <th>上班时段常驻地理位置</th>
                    <td></td>
                    <th>休息时段常驻地理位置</th>
                    <td></td>
                </tr>
                <tr>
                    <th>是否呼叫澳门电话</th>
                    <td></td>
                    <th>号码归属地市</th>
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderIdentityConnectMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">配对手机号码数</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th className="col-xs-3">手机号码</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">实名认证</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>手机入网时长</th>
                    <td></td>
                    <th>上个月通话时长</th>
                    <td></td>
                </tr>
                <tr>
                    <th>上班时段常驻地理位置</th>
                    <td></td>
                    <th>休息时段常驻地理位置</th>
                    <td></td>
                </tr>
                <tr>
                    <th>是否呼叫澳门电话</th>
                    <td></td>
                    <th>号码归属地市</th>
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*个人社会保险信息 */
var OrderStuffSocialSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位名称</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳状态</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">最后缴纳时间</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>缴纳基数</th>
                    <td></td>
                    <th>缴纳金额</th>
                    <td></td>
                </tr>
                <tr>
                    <th>最新更新时间</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderStuffSocialMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳单位名称</th>
                    <td colSpan="3"></td>
                </tr>
                <tr>
                    <th className="col-xs-3">缴纳状态</th>
                    <td className="col-xs-3"></td>
                    <th className="col-xs-3">最后缴纳时间</th>
                    <td className="col-xs-3"></td>
                </tr>
                <tr>
                    <th>缴纳基数</th>
                    <td></td>
                    <th>缴纳金额</th>
                    <td></td>
                </tr>
                <tr>
                    <th>最新更新时间</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*个人公积金信息 */
var OrderStuffFundSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <td colSpan="4" className="text-center">未匹配到借款人的个人公积金信息</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderStuffFundMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <td colSpan="4" className="text-center">未匹配到配偶的个人公积金信息</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*个人工作经历 */
var OrderStuffExpSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="text-center">入职时间</th>
                    <th className="text-center">离职时间</th>
                    <th className="text-center">公司名称</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderStuffExpMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="text-center">入职时间</th>
                    <th className="text-center">离职时间</th>
                    <th className="text-center">公司名称</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*房产信息 */
var OrderAssetHouseSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">反馈结果</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderAssetHouseMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">反馈结果</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*车辆信息 */
var OrderAssetCarSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">反馈结果</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderAssetCarMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">反馈结果</th>
                    <td colSpan="3"></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*信用卡逾期 */
var OrderCreditExpireSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">逾期记录	</th>
                    <td colSpan="3">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderCreditExpireMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">逾期记录	</th>
                    <td colSpan="3">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*违法记录 */
var OrderLawBreakSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">违法记录	</th>
                    <td colSpan="3">详细</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderLawBreakMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">违法记录	</th>
                    <td colSpan="3">详细</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*司法信息 */
var OrderJusticeSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">司法记录	</th>
                    <td colSpan="3">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderJusticeMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">司法记录	</th>
                    <td colSpan="3">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

/*黑名单信息 */
var OrderBlackListSelf = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">借款人</th>
                </tr>
                <tr>
                    <th className="col-xs-3">黑名单记录</th>
                    <td colSpan="3">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});
var OrderBlackListMeta = React.createClass({
    render: function () {
        return (
            <table className="table table-bordered table-condensed table_inline">
                <tbody>
                <tr>
                    <th colSpan="4" className="text-center">配偶</th>
                </tr>
                <tr>
                    <th className="col-xs-3">黑名单记录	</th>
                    <td colSpan="3">0条</td>
                </tr>
                </tbody>
            </table>
        );
    }
});




ReactDOM.render(
    <Order />,
    document.getElementById('page')
);
