var Breadcrumb = React.createClass({displayName: "Breadcrumb",
    getInitialState: function () {
        return {
            site: ""
        };
    },
    componentDidMount: function () {
        //var siteID = sessionStorage.getItem(SessionKey.siteID);
        //var siteMap = JSON.parse(sessionStorage.getItem(SessionKey.siteMap));
        //this.state.site = siteMap[siteID];
        //
        //this.setState(this.state);
    },
    render: function () {
        var path = new Array();
        switch (this.props.page) {
            case Page.bigdAccountInfo:
                path.push(React.createElement(BigDBreadcrumb, {key: "BigDBreadcrumb"}));
                path.push(React.createElement(BigDAccountInfoBreadcrumb, {key: "BigDAccountInfoBreadcrumb"}));
                break;
            case Page.bigdOrderList:
                path.push(React.createElement(BigDBreadcrumb, {key: "BigDBreadcrumb"}));
                path.push(React.createElement(BigDOrderListBreadcrumb, {key: "BigDOrderListBreadcrumb"}));
                break;
            case Page.bigdNewOrder:
                path.push(React.createElement(BigDBreadcrumb, {key: "BigDBreadcrumb"}));
                path.push(React.createElement(CreditSearchBreadcrumb, {key: "BigDNewOrderBreadcrumb"}));
                break;
            case Page.bigdOrderDetail:
                path.push(React.createElement(BigDBreadcrumb, {key: "BigDBreadcrumb"}));
                path.push(React.createElement(BigDOrderListBreadcrumb, {key: "BigDOrderListBreadcrumb"}));
                path.push(React.createElement(BigDOrderDetailBreadcrumb, {key: "BigDOrderDetailBreadcrumb"}));
                break;
            case Page.creditSearch:
                path.push(React.createElement(BusinessManageBreadcrumb, {key: "BusinessManageBreadcrumb"}));
                path.push(React.createElement(BusinessCenterBreadcrumb, {key: "BusinessCenterBreadcrumb"}));
                path.push(React.createElement(CreditSearchBreadcrumb, {key: "CreditSearchBreadcrumb"}));
                break;
            case Page.creditSearchHistory:
                path.push(React.createElement(BusinessManageBreadcrumb, {key: "BusinessManageBreadcrumb"}));
                path.push(React.createElement(BusinessCenterBreadcrumb, {key: "BusinessCenterBreadcrumb"}));
                path.push(React.createElement(CreditSearchHistoryBreadcrumb, {key: "CreditSearchHistoryBreadcrumb"}));
                break;
            case Page.creditBasicReport:
                path.push(React.createElement(BusinessManageBreadcrumb, {key: "BusinessManageBreadcrumb"}));
                path.push(React.createElement(BusinessCenterBreadcrumb, {key: "BusinessCenterBreadcrumb"}));
                path.push(React.createElement(CreditReportBreadcrumb, {key: "CreditReportBreadcrumb"}));
                break;
            case Page.creditSearchLog:
                path.push(React.createElement(BusinessManageBreadcrumb, {key: "BusinessManageBreadcrumb"}));
                path.push(React.createElement(StatisticCenterBreadcrumb, {key: "StatisticCenterBreadcrumb"}));
                path.push(React.createElement(CreditSearchLogBreadcrumb, {key: "CreditSearchLogBreadcrumb"}));
                break;
            case Page.profile:
                path.push(React.createElement(BusinessManageBreadcrumb, {key: "BusinessManageBreadcrumb"}));
                path.push(React.createElement(AccountCenterBreadcrumb, {key: "AccountCenterBreadcrumb"}));
                path.push(React.createElement(ProfileBreadcrumb, {key: "ProfileBreadcrumb"}));
                break;
            case Page.password:
                path.push(React.createElement(BusinessManageBreadcrumb, {key: "BusinessManageBreadcrumb"}));
                path.push(React.createElement(AccountCenterBreadcrumb, {key: "AccountCenterBreadcrumb"}));
                path.push(React.createElement(PasswordBreadcrumb, {key: "PasswordBreadcrumb"}));
                break;
        }

        return (
            React.createElement("ol", {className: "breadcrumb"}, 
                path.map(function (item) {
                    return item;
                })
            )
        );
    }
});

var BusinessManageBreadcrumb = React.createClass({displayName: "BusinessManageBreadcrumb",
    render: function () {
        return (
            React.createElement("li", null, React.createElement("a", {href: SiteProperties.webURL + Page.creditSearch}, "征信业务"))
        );
    }
});

var BusinessCenterBreadcrumb = React.createClass({displayName: "BusinessCenterBreadcrumb",
    render: function () {
        return (
            React.createElement("li", null, React.createElement("a", {href: SiteProperties.webURL + Page.creditSearch}, "业务中心"))
        );
    }
});

var StatisticCenterBreadcrumb = React.createClass({displayName: "StatisticCenterBreadcrumb",
    render: function () {
        return (
            React.createElement("li", null, React.createElement("a", {href: SiteProperties.webURL + Page.creditSearchLog}, "统计中心"))
        );
    }
});

var AccountCenterBreadcrumb = React.createClass({displayName: "AccountCenterBreadcrumb",
    render: function () {
        return (
            React.createElement("li", null, React.createElement("a", {href: SiteProperties.webURL + Page.profile}, "个人中心"))
        );
    }
});

var ProfileBreadcrumb = React.createClass({displayName: "ProfileBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, "基本资料")
        );
    }
});

var PasswordBreadcrumb = React.createClass({displayName: "PasswordBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, "密码修改")
        );
    }
});

var BigDBreadcrumb = React.createClass({displayName: "BigDBreadcrumb",
    render: function () {
        return (
            React.createElement("li", null, React.createElement("a", {href: SiteProperties.webURL + Page.bigdAccountInfo}, "浩数接口"))
        );
    }
});

var BigDAccountInfoBreadcrumb = React.createClass({displayName: "BigDAccountInfoBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, "账户信息")
        );
    }
});
var BigDOrderListBreadcrumb = React.createClass({displayName: "BigDOrderListBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, React.createElement("a", {href: SiteProperties.webURL + Page.bigdOrderList}, "查询历史"))
        );
    }
});
var CreditReportBreadcrumb = React.createClass({displayName: "CreditReportBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, "资信基础报告")
        );
    }
});

var CreditSearchBreadcrumb = React.createClass({displayName: "CreditSearchBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, "资信查询")
        );
    }
});

var CreditSearchHistoryBreadcrumb = React.createClass({displayName: "CreditSearchHistoryBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, "查询历史")
        );
    }
});

var CreditSearchLogBreadcrumb = React.createClass({displayName: "CreditSearchLogBreadcrumb",
    render: function () {
        return (
            React.createElement("li", {className: "active"}, "查询记录")
        );
    }
});

