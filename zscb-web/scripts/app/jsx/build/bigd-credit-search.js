var CreditSearchActions = Reflux.createActions(['creditSearch']);

var CreditSearchStore = Reflux.createStore({
    listenables: [CreditSearchActions],
    onCreditSearch: function (data) {
        var url = SiteProperties.serverURL + BigDAPI.creditSearch;

        data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        data.dataSource = "bigd";

        // 检查token是否过期
        if (data.accessToken == null || data.accessToken == "") {
            location.href = SiteProperties.webURL + Page.login;
            return false;
        }

        var self = this;
        var callback = function (result) {
            if (result.status == 200) {
                //console.log(data.selfIDNumber);
                sessionStorage.setItem(SessionKey.selfIDNumber, data.selfIDNumber);
                sessionStorage.setItem(SessionKey.mateIDNumber, data.mateIDNumber);
                sessionStorage.setItem(SessionKey.dataSource, "bigd");
                location.href = SiteProperties.webURL + Page.bigdCreditReport;
            }
        };
        data.houseOwnerList =  JSON.stringify(data.houseOwnerList);
        //console.log(data.houseOwnerList);
        ajaxPost(url, data, callback);
    },
});

var CreditSearch = React.createClass({displayName: "CreditSearch",
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
        //console.log(this.state.houseOwnerList);
        CreditSearchActions.creditSearch(this.state);
    },
    handleChange: function (name, event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    },
    onChildChanged: function (childState) {
        //console.log(childState);
        this.setState(this.state);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuBigDCreditSearch"}), 

                    React.createElement("div", {className: "content-page"}, 
                        React.createElement("ol", {className: "breadcrumb"}, 
                            React.createElement("li", null, React.createElement("a", {href: "#"}, "系统管理")), 
                            React.createElement("li", null, React.createElement("a", {href: "#"}, "浩数")), 
                            React.createElement("li", {className: "active"}, "资信查询")
                        ), 
                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "借款人信息录入"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "借款人")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("a", {id: "test"}), 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.selfName, 
                                                   onChange: this.handleChange.bind(this,"selfName")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "身份证号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.selfIDNumber, 
                                                   onChange: this.handleChange.bind(this,"selfIDNumber")})
                                        )
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "手机号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.selfMobile, 
                                                   onChange: this.handleChange.bind(this,"selfMobile")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "银行卡")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", 
                                                   value: this.state.selfCardNumber, 
                                                   onChange: this.handleChange.bind(this,"selfCardNumber")})
                                        )
                                    )
                                ), 
                                React.createElement("hr", null), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "配偶")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.mateName, 
                                                   onChange: this.handleChange.bind(this,"mateName")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "身份证号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.mateIDNumber, 
                                                   onChange: this.handleChange.bind(this,"mateIDNumber")})
                                        )
                                    )
                                ), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "手机号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.mateMobile, 
                                                   onChange: this.handleChange.bind(this,"mateMobile")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "银行卡")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", 
                                                   value: this.state.mateCardNumber, 
                                                   onChange: this.handleChange.bind(this,"mateCardNumber")})
                                        )
                                    )
                                ), 
                                React.createElement("hr", null), 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "房产证号")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.houseNumber, 
                                                   onChange: this.handleChange.bind(this,"houseNumber")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "地址")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.houseAddress, 
                                                   onChange: this.handleChange.bind(this,"houseAddress")})
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "面积")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("input", {type: "text", className: "form-control", value: this.state.houseArea, 
                                                   onChange: this.handleChange.bind(this,"houseArea")})
                                        )
                                    )
                                ), 
                                React.createElement(HouseOwner, {callbackParent: this.onChildChanged, 
                                            houseOwnerList: this.state.houseOwnerList}), 

                                React.createElement("div", {className: "text-right"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.handleSearch}, "查询"
                                    )
                                )
                            )
                        ), 

                        React.createElement(Footer, null)
                    )
                )

            )
        );
    }
});

var HouseOwner = React.createClass({displayName: "HouseOwner",
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
            React.createElement("div", {id: "houseOwnerWrap"}, 
                React.createElement("div", {className: "row form-group form-horizontal"}, 
                    React.createElement("div", {className: "col-xs-4"}, 
                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                            React.createElement("label", null, "其他抵押人")
                        ), 
                        React.createElement("div", {className: "col-xs-8"}, 
                            
                                React.createElement("input", {type: "text", className: "form-control", 
                                       value: this.state.houseOwnerList[0].houseOwnerUserName, 
                                       onChange: this.handleChange.bind(this,"houseOwnerUserName")})
                            
                        )
                    ), 
                    React.createElement("div", {className: "col-xs-4"}, 
                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                            React.createElement("label", null, "身份证号")
                        ), 
                        React.createElement("div", {className: "col-xs-8"}, 
                            
                                React.createElement("input", {type: "text", className: "form-control", 
                                       value: this.state.houseOwnerList[0].houseOwnerIDNumber, 
                                       onChange: this.handleChange.bind(this,"houseOwnerIDNumber")})
                            
                        )
                    ), 
                    React.createElement("div", {className: "col-xs-4"}, 
                        React.createElement("div", {className: "col-xs-4 control-label"}
                        ), 
                        React.createElement("div", {className: "col-xs-8"}, 
                            React.createElement("button", {type: "button", className: "btn btn-info", onClick: this.handleNewHouseOwner}, "新增其他抵押人"
                            )
                        )
                    )
                ), 
                
                    this.state.houseOwnerList.map(function (item, index) {
                        if (index > 0) {
                            return React.createElement(HouseOwnerItem, {key: "houseOwnerItem" + index, index: index, item: item})
                        }
                    })
                
            )
        );
    }
});

var HouseOwnerItem = React.createClass({displayName: "HouseOwnerItem",
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
        //console.log(this.props.item);
    },
    render: function () {
        return (
            React.createElement("div", {id: "houseOwnerItem" + this.props.index, className: "row form-group form-horizontal"}, 
                React.createElement("div", {className: "col-xs-4"}, 
                    React.createElement("div", {className: "col-xs-4 control-label"}, 
                        React.createElement("label", null, "其他抵押人")
                    ), 
                    React.createElement("div", {className: "col-xs-8"}, 
                        React.createElement("input", {type: "text", className: "form-control", 
                               value: this.props.houseOwnerUserName, 
                               onChange: this.handleChange.bind(this,"houseOwnerUserName")})
                    )
                ), 
                React.createElement("div", {className: "col-xs-4"}, 
                    React.createElement("div", {className: "col-xs-4 control-label"}, 
                        React.createElement("label", null, "身份证号")
                    ), 
                    React.createElement("div", {className: "col-xs-8"}, 
                        React.createElement("input", {type: "text", className: "form-control", 
                               value: this.props.houseOwnerIDNumber, 
                               onChange: this.handleChange.bind(this,"houseOwnerIDNumber")})
                    )
                ), 
                React.createElement("div", {className: "col-xs-4"}, 
                    React.createElement("div", {className: "col-xs-4 control-label"}
                    ), 
                    React.createElement("div", {className: "col-xs-8"}, 
                        React.createElement("button", {type: "button", className: "btn btn-danger", 
                                onClick: this.handleDeleteHouseOwner.bind(this,this.props.index)}, "删除抵押人"
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(
    React.createElement(CreditSearch, null),
    document.getElementById('page')
);