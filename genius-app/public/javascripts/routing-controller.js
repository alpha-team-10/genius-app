let routingController = function(dataservice, templateLoader, utils) {
    const $container = $("#container");

    function listing(name) {
        // get data and templateFunc at once and do the work
        Promise.all([dataservice.getByName(name), templateLoader.get('listing')])
            .then(result => {
                let data = result[0];
                let funcTemplate = result[1];

                data.response.hits.map(hit => {
                    hit.type = utils.isAlbum(hit) ? "album" : "song";
                    let pageViews = hit.result.stats.pageviews;
                    hit.result.stats.pageviews = utils.numberWithLetter(pageViews);
                });

                let compiledHtml = funcTemplate(data);
                console.log("rdy html ", compiledHtml);

                $("#container").html(compiledHtml);
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