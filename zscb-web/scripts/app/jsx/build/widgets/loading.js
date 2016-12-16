var Loading = React.createClass({displayName: "Loading",
    render: function () {
        return (
            React.createElement("div", {id: "loading"}, 
                React.createElement("img", {src: "../img/large-loading.gif", alt: "loading..."})
            )
        );
    }
});

