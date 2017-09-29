const container = (function() {
    const routingCtrl = routingController(dataservice, templateLoader, layoutProvider, utils);
    const navigoRouterInner = navigoRouter(routingCtrl);
    return {
        navigoRouter: navigoRouterInner
    }
})();