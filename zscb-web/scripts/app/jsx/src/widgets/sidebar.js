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

var SideBar = React.createClass({
    mixins: [Reflux.connect(SideBarMenuStore, 'channelList')],
    getInitialState: function () {
        return {
            user:{},
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
        $.each($parentULList, function(index, item){
            $ul = $(item);
            $a = $ul.prev();
            $a.addClass("active");
            if($ul.is(":hidden")){
                $a.find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
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
    handleToggleSub: function(event){
        var $a = $(event.target);
        var $next = $a.next("ul");

        if($next.is(":hidden")){
            $a.find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
        } else{
            $a.find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
        }

        $next.toggle(300);
    },
    render: function () {
        return (
            <div id="sidebar" className="sidebar">
                <div id="sidebarMenu" className="sidebar-menu">
                    <ul>
                        <li>
                            <a id="sideMenuBigDAccountInfo" href={SiteProperties.webURL + Page.bigdAccountInfo}>
                                <i className="fa fa-user"></i>
                                <span>账户信息</span>
                            </a>
                        </li>
                        <li>
                            <a id="sideMenuBigDOrder" href="javascript:void(0)" className="has-sub" onClick={this.handleToggleSub}>
                                <i className="fa fa-search"></i>
                                <span>业务中心</span>
                                <span className="pull-right">
                                    <i className="fa fa-minus"></i>
                                </span>
                            </a>
                            <ul>
                                <li>
                                    <a id="sideMenuBigDOrderSearch" href={SiteProperties.webURL + Page.bigdOrderList}>资信查询</a>
                                </li>
                                <li>
                                    <a id="sideMenuBigDOrderHistory" href={SiteProperties.webURL + Page.bigdOrderList}>查询历史</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

function createChannelTree($channelTree, item, index) {
    var $li = $("<li></li>");
    var $a = $("<a href='javascript:void(0)'></a>");
    $a.text(item.text);
    $li.append($a);

    //var text = "";
    //for (var i = 0; i < index; i++) {
    //    text += "&nbsp;";
    //}
    //text = text + item.text;
    //$option.html(text);
    $channelTree.append($li);

    if (item.nodes.length > 0) {
        var $ul = $("<ul></ul>");
        $li.append($ul);
        $.each(item.nodes, function (index, item) {
            index = index + 1;
            createChannelTree($ul, item, index);
        });
    }
}