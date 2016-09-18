var Breadcrumb = React.createClass({
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
                path.push(<BigDBreadcrumb key="BigDBreadcrumb"/>);
                path.push(<BigDAccountInfoBreadcrumb key="BigDAccountInfoBreadcrumb"/>);
                break;
            case Page.bigdOrderList:
                path.push(<BigDBreadcrumb key="BigDBreadcrumb"/>);
                path.push(<BigDOrderListBreadcrumb key="BigDOrderListBreadcrumb"/>);
                break;
            case Page.bigdNewOrder:
                path.push(<BigDBreadcrumb key="BigDBreadcrumb"/>);
                path.push(<CreditSearchBreadcrumb key="BigDNewOrderBreadcrumb"/>);
                break;
            case Page.bigdOrderDetail:
                path.push(<BigDBreadcrumb key="BigDBreadcrumb"/>);
                path.push(<BigDOrderListBreadcrumb key="BigDOrderListBreadcrumb"/>);
                path.push(<BigDOrderDetailBreadcrumb key="BigDOrderDetailBreadcrumb"/>);
                break;
            case Page.creditSearch:
                path.push(<BusinessManageBreadcrumb key="BusinessManageBreadcrumb"/>);
                path.push(<BusinessCenterBreadcrumb key="BusinessCenterBreadcrumb"/>);
                path.push(<CreditSearchBreadcrumb key="CreditSearchBreadcrumb"/>);
                break;
            case Page.creditSearchHistory:
                path.push(<BusinessManageBreadcrumb key="BusinessManageBreadcrumb"/>);
                path.push(<BusinessCenterBreadcrumb key="BusinessCenterBreadcrumb"/>);
                path.push(<CreditSearchHistoryBreadcrumb key="CreditSearchHistoryBreadcrumb"/>);
                break;
            case Page.creditBasicReport:
                path.push(<BusinessManageBreadcrumb key="BusinessManageBreadcrumb"/>);
                path.push(<BusinessCenterBreadcrumb key="BusinessCenterBreadcrumb"/>);
                path.push(<CreditReportBreadcrumb key="CreditReportBreadcrumb"/>);
                break;
        }

        return (
            <ol className="breadcrumb">
                {path.map(function (item) {
                    return item;
                })}
            </ol>
        );
    }
});

var BusinessManageBreadcrumb = React.createClass({
    render: function () {
        return (
            <li><a href={SiteProperties.webURL + Page.creditSearch}>征信业务</a></li>
        );
    }
});

var BusinessCenterBreadcrumb = React.createClass({
    render: function () {
        return (
            <li><a href={SiteProperties.webURL + Page.creditSearch}>业务中心</a></li>
        );
    }
});

var BigDBreadcrumb = React.createClass({
    render: function () {
        return (
            <li><a href={SiteProperties.webURL + Page.bigdAccountInfo}>浩数接口</a></li>
        );
    }
});

var BigDAccountInfoBreadcrumb = React.createClass({
    render: function () {
        return (
            <li className='active'>账户信息</li>
        );
    }
});
var BigDOrderListBreadcrumb = React.createClass({
    render: function () {
        return (
            <li className='active'><a href={SiteProperties.webURL + Page.bigdOrderList}>查询历史</a></li>
        );
    }
});
var CreditReportBreadcrumb = React.createClass({
    render: function () {
        return (
            <li className='active'>资信基础报告</li>
        );
    }
});

var CreditSearchBreadcrumb = React.createClass({
    render: function () {
        return (
            <li className='active'>资信查询</li>
        );
    }
});

var CreditSearchHistoryBreadcrumb = React.createClass({
    render: function () {
        return (
            <li className='active'>查询历史</li>
        );
    }
});

