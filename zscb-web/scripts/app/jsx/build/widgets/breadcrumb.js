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
        switch (this.props.page){
            case Page.bigdAccountInfo:
                path.push(React.createElement(BigDBreadcrumb, {key: "BigDBreadcrumb"}));
                path.push(React.createElement(BigDAccountInfoBreadcrumb, {key: "BigDAccountInfoBreadcrumb"}));
                break;
            case Page.bigdOrderList:
                path.push(React.createElement(BigDBreadcrumb, {key: "BigDBreadcrumb"}));
                path.push(React.createElement(BigDOrderListBreadcrumb, {key: "BigDOrderListBreadcrumb"}));
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

var BigDBreadcrumb = React.createClass({displayName: "BigDBreadcrumb",
    render: function () {
        return (
            React.createElement("li", null, React.createElement("a", {href: SiteProperties.webURL + BigDAPI.getAccountInfo}, "浩数接口"))
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
            React.createElement("li", {className: "active"}, "查询历史")
        );
    }
});


