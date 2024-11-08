
module.exports = (targets) => {
    targets.of("@magento/venia-ui").routes.tap((routes) => {
        routes.push({
            name: "MyGreetingRoute",
            pattern: "/greeting/:who?",
            path: require.resolve("../components/GreetingPage/greetingPage.js"),
        });
        return routes;
    });
    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "MyCustomCmsBlock",
            pattern: "/customcmsblock",
            path: require.resolve("../components/CustomCmsBlock/customCmsBlock.js")
        });
        return routes;
    });
};

