var CreditSearchActions = Reflux.createActions(['creditSearch']);

var CreditSearchStore = Reflux.createStore({
    listenables: [CreditSearchActions],
    onCreditSearch: function (data) {
        var url = SiteProperties.serverURL + BussinessAPI.creditSearch;

        data.accessKey = SecurityClient.accessKey;
        data.accessSecret = SecurityClient.accessSecret;
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
                location.href = SiteProperties.webURL + Page.creditBasicReport;
            }
        };

        ajaxPost(url, data, callback);
    },
});

var CreditSearch = React.createClass({
    mixins: [Reflux.connect(CreditSearchStore, 'searchCondition')],
    getInitialState: function () {
        return {
            selfName: "",
            selfIDNumber: "",
            selfMobile: "",
            selfCardNumber: "",
            mateName: "",
            mateIDNumber: "",
            mateMobile: "",
            mateCardNumber: "",
            houseNumber: "",
            houseAddress: "",
            houseArea: "",
            houseOwnerList: [{
                houseOwnerUserName: "",
                houseOwnerIDNumber: "",
            },
            ]
        };
    },
    componentDidMount: function () {
        //console.log(this.state.houseOwnerList[0].houseOwnerUserName);
        //var $tagList = $("a");
        //console.log($tagList);
        //$.each($tagList, function (index, object) {
        //    console.log(object);
        //    $(object).html("<s:text name='CFBSNF01001.blank' />");
            //console.log(object.html());
        //});
    },
    handleSearch: function () {
        //location.href = SiteProperties.webURL + Page.creditBasicReport;
        CreditSearchActions.creditSearch(this.state);
    },
    handleChange: function (name, event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    },
    onChildChanged: function (childState) {
        //console.log(childState);
        if (childState.houseOwnerList != null) {
            this.state.houseOwnerList = childState.houseOwnerList;
        }
        this.setState(this.state);
    },
    render: function () {
        return (
            <div>
                <Header activeMenuID="mainMenuBussinessManage"/>

                <div id="main" className="container-fluid margin-top-60">
                    <SideBar activeMainMenuID="mainMenuBussinessManage" activeMenuID="sideMenuCreditSearch"/>

                    <div className="content-page">
                        <Breadcrumb page={Page.creditSearch}/>

                        <div className="panel panel-default">
                            <div className="panel-heading">借款人信息录入</div>
                            <div className="panel-body">
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>借款人</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <a id="test"></a>
                                            <input type="text" className="form-control" value={this.state.selfName}
                                                   onChange={this.handleChange.bind(this,"selfName")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.selfIDNumber}
                                                   onChange={this.handleChange.bind(this,"selfIDNumber")}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>手机号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.selfMobile}
                                                   onChange={this.handleChange.bind(this,"selfMobile")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>银行卡</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control"
                                                   value={this.state.selfCardNumber}
                                                   onChange={this.handleChange.bind(this,"selfCardNumber")}/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>配偶</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.mateName}
                                                   onChange={this.handleChange.bind(this,"mateName")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>身份证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.mateIDNumber}
                                                   onChange={this.handleChange.bind(this,"mateIDNumber")}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>手机号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.mateMobile}
                                                   onChange={this.handleChange.bind(this,"mateMobile")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>银行卡</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control"
                                                   value={this.state.mateCardNumber}
                                                   onChange={this.handleChange.bind(this,"mateCardNumber")}/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row form-group form-horizontal">
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>房产证号</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.houseNumber}
                                                   onChange={this.handleChange.bind(this,"houseNumber")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>地址</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.houseAddress}
                                                   onChange={this.handleChange.bind(this,"houseAddress")}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="col-xs-4 control-label">
                                            <label>面积</label>
                                        </div>
                                        <div className="col-xs-8">
                                            <input type="text" className="form-control" value={this.state.houseArea}
                                                   onChange={this.handleChange.bind(this,"houseArea")}/>
                                        </div>
                                    </div>
                                </div>
                                <HouseOwner callbackParent={this.onChildChanged}
                                            houseOwnerList={this.state.houseOwnerList}/>

                                <div className="text-right">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSearch}>查询
                                    </button>
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

var HouseOwner = React.createClass({
    getInitialState: function () {
        return {
            houseOwnerList: this.props.houseOwnerList
        };
    },
    handleNewHouseOwner: function () {
        var houseOwnerItem = {
            houseOwnerUserName: "",
            houseOwnerIDNumber: ""
        };
        this.state.houseOwnerList.push(houseOwnerItem);
        this.setState(this.state);
        //this.props.callbackParent(this.state.houseOwnerList);
    },
    handleChange: function (name, event) {
        if(name == "houseOwnerUserName") {
            this.state.houseOwnerList[0].houseOwnerUserName = event.target.value;
        }
        else if(name == "houseOwnerIDNumber") {
            this.state.houseOwnerList[0].houseOwnerIDNumber = event.target.value;
        }
        this.props.callbackParent(this.state.houseOwnerList);
    },
    onChildChanged2: function (childState) {
        console.log(childState);
        if (childState.houseOwnerUserName != null) {
            this.state.houseOwnerList[childState.index].houseOwnerUserName = childState.houseOwnerUserName;
        }
        if (childState.houseOwnerIDNumber != null) {
            this.state.houseOwnerList[childState.index].houseOwnerIDNumber = childState.houseOwnerIDNumber;
        }
        this.props.callbackParent(this.state.houseOwnerList);
    },
    render: function () {
        return (
            <div id="houseOwnerWrap">
                <div className="row form-group form-horizontal">
                    <div className="col-xs-4">
                        <div className="col-xs-4 control-label">
                            <label>其他抵押人</label>
                        </div>
                        <div className="col-xs-8">
                            {
                                <input type="text" className="form-control"
                                       value={this.state.houseOwnerList[0].houseOwnerUserName}
                                       onChange={this.handleChange.bind(this,"houseOwnerUserName")}/>
                            }
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="col-xs-4 control-label">
                            <label>身份证号</label>
                        </div>
                        <div className="col-xs-8">
                            {
                                <input type="text" className="form-control"
                                       value={this.state.houseOwnerList[0].houseOwnerIDNumber}
                                       onChange={this.handleChange.bind(this,"houseOwnerIDNumber")}/>
                            }
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="col-xs-4 control-label">
                        </div>
                        <div className="col-xs-8">
                            <button type="button" className="btn btn-info" onClick={this.handleNewHouseOwner}>新增其他抵押人
                            </button>
                        </div>
                    </div>
                </div>
                {
                    this.state.houseOwnerList.map(function (item, index) {
                        if (index > 0) {
                            return <HouseOwnerItem key={"houseOwnerItem" + index} index={index} item={item}/>
                        }
                    })
                }
            </div>
        );
    }
});

var HouseOwnerItem = React.createClass({
    getInitialState: function () {
        return {
            index: this.props.index,
            houseOwnerUserName: "",
            houseOwnerIDNumber: ""
        };
    },
    handleDeleteHouseOwner: function (id) {
        this.props.item.houseOwnerUserName = "";
        this.props.item.houseOwnerIDNumber = "";
        $("#houseOwnerItem" + id).remove();
    },
    handleChange: function (name, event) {
        if(name == "houseOwnerUserName") {
            this.props.item.houseOwnerUserName = event.target.value;
        }

        if(name == "houseOwnerIDNumber") {
            this.props.item.houseOwnerIDNumber = event.target.value;
        }

        //this.props.callbackParent(this.state.houseOwnerUserName);
        console.log(this.props.item);
    },
    render: function () {
        return (
            <div id={"houseOwnerItem" + this.props.index} className="row form-group form-horizontal">
                <div className="col-xs-4">
                    <div className="col-xs-4 control-label">
                        <label>其他抵押人</label>
                    </div>
                    <div className="col-xs-8">
                        <input type="text" className="form-control"
                               value={this.props.houseOwnerUserName}
                               onChange={this.handleChange.bind(this,"houseOwnerUserName")}/>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="col-xs-4 control-label">
                        <label>身份证号</label>
                    </div>
                    <div className="col-xs-8">
                        <input type="text" className="form-control"
                               value={this.props.houseOwnerIDNumber}
                               onChange={this.handleChange.bind(this,"houseOwnerIDNumber")}/>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="col-xs-4 control-label">
                    </div>
                    <div className="col-xs-8">
                        <button type="button" className="btn btn-danger"
                                onClick={this.handleDeleteHouseOwner.bind(this,this.props.index)}>删除抵押人
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <CreditSearch />,
    document.getElementById('page')
);