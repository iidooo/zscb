var Footer = React.createClass({displayName: "Footer",
    render: function () {
        return (
            React.createElement("footer", {className: "footer"}, 
                    React.createElement("p", {className: "text-muted text-center"}, React.createElement("i", {className: "fa fa-copyright"}), "  个人审贷资信验证平台"), 
                    React.createElement("p", {className: "text-muted text-center"}, "版本：", SiteProperties.siteVersion)
            )
        );
    }
});