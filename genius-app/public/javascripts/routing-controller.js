let $container = $("#container");

// request-provider
// template-loader
// layout-provider

let routingController = function(dataservice, templateLoader, layoutProvider, utils) {

    function listing(name) {
        let pendingData = null;

        dataservice
            .getByName(name)
            .then(data => {

                // save the data for later use
                pendingData = data;

                // postprocessing
                pendingData.response.hits.map(hit => {
                    hit.type = utils.isAlbum(hit) ? "album" : "song";
                    let pageViews = hit.result.stats.pageviews;
                    hit.result.stats.pageviews = utils.numberWithLetter(pageViews);
                });

                // return the template for listing
                return templateLoader.get("listing");
            })
            .then(funcTemplate => {
                // compile and attach to DOM
                let compiledHtml = funcTemplate(pendingData);
                layoutProvider.partialLayout($container, compiledHtml);
            });
    }

    function song(id) {

        // DEMO, delete and implement
        templateLoader.get("song")
            .then(funcTemplate => {
                let compiledHtml = funcTemplate({});
                layoutProvider.partialLayout($container, compiledHtml);
            })
    }

    function album(id) {

        // DEMO, delete and implement
        templateLoader.get("album")
            .then(funcTemplate => {
                let compiledHtml = funcTemplate({});
                layoutProvider.partialLayout($container, compiledHtml);
            })
    }

    return {
        listing,
        song,
        album
    };
};