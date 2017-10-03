let routingController = function (dataservice, templateLoader, utils) {
    const $container = $("#container");


    // postprocess views, also 
    // the albums come as songs, take album ID through each song
    // and assign it back and change the type to album
    function postprocessListing(data) {
        let promises = [];

        data.response.hits.map((hit) => {
            let pageViews = hit.result.stats.pageviews;
            hit.result.stats.pageviews = utils.numberWithLetter(pageViews);

            let isAlbum = utils.isAlbum(hit);
            if (isAlbum) {
                hit.type = "album";
                promises.push(dataservice.getSongById(hit.result.id)
                    .then((data) => {
                        let albumId = data.response.song.album.id;
                        hit.result.id = albumId;
                    })
                );
            }
        });

        return Promise.all(promises);

    }

    function listing(name) {
        // get data and templateFunc at once and do the work
        Promise.all([dataservice.getByName(name), templateLoader.get('listing')])
            .then((result) => {
                let data = result[0];
                let funcTemplate = result[1];

                postprocessListing(data)
                    .then(() => {
                        let compiledHtml = funcTemplate(data);
                        $("#container").html(compiledHtml);
                    })
            });
    }

    function song(id) {
        dataservice.getSongById(id);
        // DEMO, delete and implement
    }

    function album(id) {

        // DEMO, delete and implement

        dataservice.getAlbumById(id);

    }

    return {
        listing,
        song,
        album
    };
};