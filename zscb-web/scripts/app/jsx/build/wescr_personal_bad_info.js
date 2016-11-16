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

var Page = React.createClass({displayName: "Page",
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
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuSysManage"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMainMenuID: "mainMenuSysManage", activeMenuID: "sideMenuWescrPersonBadInfo"}), 
                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.wescrPersonalBadInfo}), 
                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, "查询条件"), 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "row form-group form-horizontal"}, 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "开始时间")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("div", {className: "input-group date form_date", "data-date": "", 
                                                 "data-date-format": "yyyy-mm-dd", 
                                                 "data-link-field": "startDate", "data-link-format": "yyyy-mm-dd"}, 
                                                React.createElement("input", {id: "startDate", className: "form-control", type: "text", 
                                                       ref: "inputStartDate", 
                                                       readonly: true}), 
                                                React.createElement("span", {className: "input-group-addon"}, 
                                                    React.createElement("span", {className: "glyphicon glyphicon-calendar"})
                                                )
                                            )
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("div", {className: "col-xs-4 control-label"}, 
                                            React.createElement("label", null, "结束时间")
                                        ), 
                                        React.createElement("div", {className: "col-xs-8"}, 
                                            React.createElement("div", {className: "input-group date form_date", "data-date": "", 
                                                 "data-date-format": "yyyy-mm-dd", 
                                                 "data-link-field": "endDate", "data-link-format": "yyyy-mm-dd"}, 
                                                React.createElement("input", {id: "endDate", className: "form-control", type: "text", ref: "inputEndDate", 
                                                       readonly: true}), 
                                                React.createElement("span", {className: "input-group-addon"}, 
                                                    React.createElement("span", {className: "glyphicon glyphicon-calendar"})
                                                )
                                            )
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-xs-4"}, 
                                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "查询")
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

ReactDOM.render(
    React.createElement(Page, null),
    document.getElementById('page')
);