const container = (function() {
    const routingCtrl = routingController(dataservice, templateLoader, utils);
    const navigoRouterInner = navigoRouter(routingCtrl);
    return {
        navigoRouter: navigoRouterInner
    }
})();