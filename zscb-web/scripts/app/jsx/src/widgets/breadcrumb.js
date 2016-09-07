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
        switch (this.props.page){
            case Page.bigdAccountInfo:
                path.push(<BigDBreadcrumb key="BigDBreadcrumb"/>);
                path.push(<BigDAccountInfoBreadcrumb key="BigDAccountInfoBreadcrumb"/>);
                break;
            case Page.bigdOrderList:
                path.push(<BigDBreadcrumb key="BigDBreadcrumb"/>);
                path.push(<BigDOrderListBreadcrumb key="BigDOrderListBreadcrumb"/>);
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

var BigDBreadcrumb = React.createClass({
    render: function () {
        return (
            <li><a href={SiteProperties.webURL + BigDAPI.getAccountInfo}>浩数接口</a></li>
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
            <li className='active'>查询历史</li>
        );
    }
});


