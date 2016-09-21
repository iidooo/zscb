var SideBarMenuActions = Reflux.createActions(['getChannelTree']);

var SideBarMenuStore = Reflux.createStore({
    listenables: [SideBarMenuActions],
    onGetChannelTree: function (data) {

        //var url = SiteProperties.serverURL + API.getChannelTree;
        //data.accessKey = SecurityClient.accessKey;
        //data.accessSecret = SecurityClient.accessSecret;
        //data.accessToken = sessionStorage.getItem(SessionKey.accessToken);
        //data.operatorID = sessionStorage.getItem(SessionKey.operatorID);
        //data.siteID = sessionStorage.getItem(SessionKey.siteID);
        //
        //// 检查token是否过期
        //if (data.accessToken == null || data.accessToken == "") {
        //    location.href = SiteProperties.clientURL + Page.login;
        //    return false;
        //}
        //
        //var self = this;
        //
        //var callback = function (result) {
        //
        //    if (result.status == 200) {
        //        self.trigger(result.data);
        //    } else {
        //        console.log(result);
        //    }
        //};
        //
        //ajaxPost(url, data, callback);
    },
});

var SideBar = React.createClass({displayName: "SideBar",
    mixins: [Reflux.connect(SideBarMenuStore, 'channelList')],
    getInitialState: function () {
        return {
            user: {},
            role: {},
            channelList: []
        };
    },
    componentDidMount: function () {
        //SideBarMenuActions.getChannelTree(this.state);

        //this.state.user = JSON.parse(sessionStorage.getItem(SessionKey.user));
        //if(this.state.user == null){
        //    location.href = SiteProperties.clientURL + Page.login;
        //}
        //
        //// 得到该用户的当前站点角色
        //var siteOwnerMap = JSON.parse(sessionStorage.getItem(SessionKey.siteOwnerMap));
        //var siteID = sessionStorage.getItem(SessionKey.siteID);
        //var siteOwner = siteOwnerMap[siteID];
        //this.state.role = siteOwner.role;
        //
        // 设置menu的active
        var activeMenuID = this.props.activeMenuID;

        $("#" + activeMenuID).addClass("active");

        // 展开所有的父UL
        var $parentULList = $("#" + activeMenuID).parents("ul");
        $.each($parentULList, function (index, item) {
            $ul = $(item);
            $a = $ul.prev();
            $a.addClass("active");
            if ($ul.is(":hidden")) {
                $a.find(".fa-angle-right").removeClass("fa-angle-right").addClass("fa-angle-down");
                $ul.toggle(300)
            }
        });
        this.setState(this.state);
    },
    componentDidUpdate: function () {
        //var $contentChannelTree = $("#contentChannelTree");
        //$contentChannelTree.children().remove();
        //$.each(this.state.channelList, function (index, item) {
        //    var index = 0;
        //    createChannelTree($contentChannelTree, item, index);
        //});
    },
    handleToggleSub: function (event) {
        var $a = $(event.target);
        var $next = $a.next("ul");
        if ($next.is(":hidden")) {
            $a.find(".fa-angle-right").removeClass("fa-angle-right").addClass("fa-angle-down");
        } else {
            $a.find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-right");
        }

        $next.toggle(300);
    },
    render: function () {
        var sidebar = React.createElement(SysManageSideBar, null);
        if(this.props.activeMainMenuID == "mainMenuBussinessManage"){
            sidebar = React.createElement(BusinessManageSideBar, {callbackParent: this.handleToggleSub});
        }
        return (
            React.createElement("div", {id: "sidebar", className: "sidebar"}, 
                React.createElement("div", {id: "sidebarMenu", className: "sidebar-menu"}, 
                    sidebar
                )
            )
        );
    }
});


var SysManageSideBar = React.createClass({displayName: "SysManageSideBar",
    render: function () {
        return (
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement("a", {id: "sideMenuBigD", href: "javascript:void(0)", className: "has-sub", 
                       onClick: this.handleToggleSub}, 
                        React.createElement("i", {className: "fa fa-minus"}), 
                        React.createElement("span", null, "浩数接口")
                    ), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuBigDAccountInfo", href: SiteProperties.webURL + Page.bigdAccountInfo}, "账户信息")
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuBigDNewOrder", href: SiteProperties.webURL + Page.bigdNewOrder}, "资信查询")
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuBigDOrderHistory", href: SiteProperties.webURL + Page.bigdOrderList}, "查询历史")
                        )
                    )
                )
            )
        );
    }
});

var BusinessManageSideBar = React.createClass({displayName: "BusinessManageSideBar",
    render: function () {
        return (
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement("a", {id: "sideMenuBussinessCenter", href: "javascript:void(0)", className: "has-sub", 
                       onClick: this.props.callbackParent}, 
                        React.createElement("i", {className: "fa fa-angle-down"}), 
                        React.createElement("span", null, "业务中心")
                    ), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuCreditSearch", href: SiteProperties.webURL + Page.creditSearch}, 
                                React.createElement("i", {className: "fa fa-search"}), 
                                React.createElement("span", null, "资信查询")
                            )
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuCreditSearchHistory", href: SiteProperties.webURL + Page.creditSearchHistory}, 
                                React.createElement("i", {className: "fa fa-list"}), 
                                React.createElement("span", null, "查询历史")
                            )
                        )
                    )
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {id: "sideMenuBigD", href: "javascript:void(0)", className: "has-sub", 
                       onClick: this.props.callbackParent}, 
                        React.createElement("i", {className: "fa fa-angle-right"}), 
                        React.createElement("span", null, "统计中心")
                    ), 
                    React.createElement("ul", {style: {display:"none"}}, 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuCreditSearchLog", href: SiteProperties.webURL + Page.creditSearchLog}, "查询记录")
                        )
                    )
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {id: "sideMenuBigD", href: "javascript:void(0)", className: "has-sub", 
                       onClick: this.props.callbackParent}, 
                        React.createElement("i", {className: "fa fa-angle-right"}), 
                        React.createElement("span", null, "个人中心")
                    ), 
                    React.createElement("ul", {style: {display:"none"}}, 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuProfile", href: SiteProperties.webURL + Page.profile}, "基本资料")
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {id: "sideMenuPassword", href: SiteProperties.webURL + Page.password}, "密码修改")
                        )
                    )
                )
            )
        );
    }
});
