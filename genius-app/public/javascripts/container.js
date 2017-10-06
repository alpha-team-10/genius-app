const container = (function() {
    const dataService = dataservice(localStorageProvider);
    const routingCtrl = routingController(dataService, templateLoader, utils);
    const navigoRouterInner = navigoRouter(routingCtrl);
    return {
        navigoRouter: navigoRouterInner
    }
})();