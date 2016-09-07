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

var OrderList = React.createClass({displayName: "OrderList",
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
            React.createElement("div", null, 
                React.createElement(Header, {activeMenuID: "mainMenuBigD"}), 

                React.createElement("div", {id: "main", className: "container-fluid margin-top-60"}, 
                    React.createElement(SideBar, {activeMenuID: "sideMenuBigDOrderHistory"}), 
                    React.createElement("div", {className: "content-page"}, 
                        React.createElement(Breadcrumb, {page: Page.bigdOrderList}), 
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
                        React.createElement(OrderListTable, {contentList: this.state.contentsData.contentList}), 

                        React.createElement(Pager, {callbackParent: this.onChildChanged, 
                               recordSum: this.state.contentsData.page.recordSum, 
                               currentPage: this.state.contentsData.page.currentPage, 
                               pageSum: this.state.contentsData.page.pageSum}), 

                        React.createElement(Footer, null)

                    )
                )

            )
        );
    }
});

var OrderListTable = React.createClass({displayName: "OrderListTable",
    render: function () {
        return (
            React.createElement("table", {className: "table table-hover"}, 
                React.createElement("thead", null, 
                React.createElement("tr", null, 
                    React.createElement("th", null, "栏目"), 
                    React.createElement("th", {className: "width-400"}, "标题"), 
                    React.createElement("th", null, "类型"), 
                    React.createElement("th", null, "状态"), 
                    React.createElement("th", null, "发布者"), 
                    React.createElement("th", null, "发布时间"), 
                    React.createElement("th", null, "更新时间")
                )
                ), 
                React.createElement("tbody", null, 
                this.props.contentList.map(function (item) {
                    return React.createElement(OrderListTableRow, {key: item.contentID, content: item})
                })
                )
            )
        );
    }
});

var OrderListTableRow = React.createClass({displayName: "OrderListTableRow",
    handleLink: function (contentID) {
        sessionStorage.setItem(SessionKey.contentID, contentID);
        location.href = SiteProperties.clientURL + Page.content;
    },
    render: function () {
        return (
            React.createElement("tr", {onClick: this.handleLink.bind(null, this.props.content.contentID)}, 
                React.createElement("td", null, this.props.content.channel.channelName), 
                React.createElement("td", null, React.createElement("a", {href: "javascript:void(0)", onClick: this.handleLink.bind(null, this.props.content.contentID)}, this.props.content.contentTitle)), 
                React.createElement("td", null, ContentTypeMap[this.props.content.contentType]), 
                React.createElement("td", null, ContentStatusMap[this.props.content.status]), 
                React.createElement("td", null, this.props.content.createUser.userName), 
                React.createElement("td", null, new Date(this.props.content.createTime).format('yyyy-MM-dd hh:mm:ss')), 
                React.createElement("td", null, new Date(this.props.content.updateTime).format('yyyy-MM-dd hh:mm:ss'))
            )
        );
    }
});

ReactDOM.render(
    React.createElement(OrderList, null),
    document.getElementById('page')
);