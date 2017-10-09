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
        let data;
        let funcTemplate;
        // get data and templateFunc at once and do the work
        Promise.all([dataservice.getByName(name), templateLoader.get('listing')])
            .then((result) => {
                data = result[0];
                funcTemplate = result[1];

                postprocessListing(data)
            })
            .then(() => {
                let compiledHtml = funcTemplate(data);
                $("#container").html(compiledHtml);
            })
    }

    function song(id) {
        let data;
        let funcTemplate;

        Promise.all([dataservice.getSongById(id), templateLoader.get('song')])
            .then((result) => {
                data = result[0];
                funcTemplate = result[1];
                return dataservice.getHTML(data.response.song.url)

            })
            .then((dataHtml) => {
                let lyrics = ($($.parseHTML(dataHtml)).find("div.lyrics"));
                let text = lyrics[0].innerHTML;
                data["lyrics"] = text;
                let pw = data.response.song.stats.pageviews;
                data.response.song.stats.pageviews = utils.numberWithLetter(pw);
                let albumURL = data.response.song.album.api_path;
                let toAdd = albumURL.substr((albumURL.indexOf("/albums",1) + 8), albumURL.length - 6);
                data.response.song.album.api_path = "/album" + toAdd;
                let providers = data.response.song.media;
                for (let i = 0; i < providers.length; i += 1) {
                    if (providers[i].provider === "youtube") {
                        let iFrameLink = "https://www.youtube.com/embed/";
                        let rawYoutubeLink = providers[i].url;
                        let startIndex = rawYoutubeLink.indexOf("?v=", 1) + 3;
                        let forAdd = rawYoutubeLink.substr(startIndex, rawYoutubeLink.length - startIndex);
                        iFrameLink += forAdd;
                        data["iframe"] = iFrameLink;
                    }
                }

                let artist = data.response.song.primary_artist.name;
                let title = data.response.song.title;
                return dataservice.getAmazonProducts(artist, title)
            })
            .then((amazonResponse) => {
                data["amazon"] = amazonResponse.Items.MoreSearchResultsUrl;
                let compiledHtml = funcTemplate(data);
                $("#container").html(compiledHtml);
            })
    }

    function album(id) {
        Promise.all([dataservice.getAlbumById(id), templateLoader.get('album')])
            .then((result) => {

                let data = result[0];                
                let url = data.response.album.url;

                let htmlTemplate = result[1];
                console.log(url);
                dataservice.getHTML(url)
                    .then(htmlText => {

                        let $parsedJqHtml = $($.parseHTML(htmlText));
                        let raw = $parsedJqHtml.find("div.chart_row-content h3.chart_row-content-title");

                        let songs = [];
                        for (let h3 of raw) {
                            h3.innerText = h3.innerText.substr(0, h3.innerText.indexOf("Lyrics")).trim();
                            songs.push(h3.innerText);
                        }
                        songs.pop();
                        data.response.album.songlist = songs;

                        let compiledHtml = htmlTemplate(data);

                        $("#container").html(compiledHtml);

                    })
            });
    }

    return {
        listing,
        song,
        album
    };
};