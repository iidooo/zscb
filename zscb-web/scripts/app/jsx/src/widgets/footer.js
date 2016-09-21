var Footer = React.createClass({
    render: function () {
        return (
            <footer className="footer">
                    <p className="text-muted text-center"><i className="fa fa-copyright"></i>&nbsp;&nbsp;个人审贷资信验证平台</p>
                    <p className="text-muted text-center">版本：{SiteProperties.siteVersion}</p>
            </footer>
        );
    }
});