let $container = $("#container");

let routingController = (function() {
    let requester;
    // layout provider injection

    function init(requestProvider) {
        requester = requestProvider;
        return this;
    }

    function listing(name) {
        let pendingData = null;

        requester
            .searchByName(name)
            .then(data => {
                // save the data
                pendingData = data;

                // check whether the item is a song or album
                pendingData.response.hits.map(hit => {
                    hit.type = utils.isAlbum(hit) ? "album" : "song";
                });
                // return the template for listing
                return templateLoader.get("listing");
            })
            .then(funcTemplate => {
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
        init,
        listing,
        song,
        album
    };
})();