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
                        //console.log("before: functemplate: ", funcTemplate);
                        let compiledHtml = funcTemplate(data);

                        //console.log("after: rdy html: ", compiledHtml);
                        $("#container").html(compiledHtml);
                    })
            });
    }

    function song(id) {
        let data;
        let funcTemplate;

        Promise.all([dataservice.getSongById(id), templateLoader.get('song')])
            .then((result) => {

                data = result[0];
                funcTemplate = result[1];
                console.log(data);
                dataservice.getHTML(data.response.song.url)
                    .then((dataHtml)=> {
                        let lyrics = ($($.parseHTML(dataHtml)).find("div.lyrics"));
                        let text = lyrics[0].innerHTML;
                        data["lyrics"] = text;
                        let artist = data.response.song.primary_artist.name;
                        let title = data.response.song.title;
                        console.log("before");
                        dataservice.getAmazonProducts(artist,title)
                            .then((amazonResponse) => {
                                console.log("after");
                                console.log("Response ", amazonResponse);
                                data["amazon"] = amazonResponse.Items.MoreSearchResultsUrl;
                                let compiledHtml = funcTemplate(data);                
                                $("#container").html(compiledHtml);
                            })
                    })
            });
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
                        for(let h3 of raw){                         
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