let dataservice = (function () {
    const token = "1l3dy56GF-qDMuZNFTp0AFWWHdPn7qkDprs5peuXXF1q0wI5QAXbhClYccANbcr_";

    // reference: https://stackoverflow.com/a/30659268/4990859
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (options.cache) {
            let success = originalOptions.success || $.noop;
            let url = originalOptions.url;

            options.cache = false; //remove jQuery cache as we have our own localStorage

            options.beforeSend = function () {
                if (localStorage.getItem(url)) {
                    success(JSON.parse(localStorage.getItem(url)));
                    return false;
                }
                return true;
            };
            options.success = function (data, textStatus) {
                let responseData = JSON.stringify(data);
                localStorage.setItem(url, responseData);
                if ($.isFunction(success)) {
                    success(data); //call back to original ajax call
                }
            };
        }
    });

    function getByName(name) {
        let url = "https://api.genius.com/search?access_token=" +
            token + "&q=" + encodeURIComponent(name);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                dataType: "json",
                cache: true,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    console.log("Something happened ", err);
                }
            });
        })
    }

    function getSongById(id) {
        let url = "https://api.genius.com/songs/" + id + "?access_token=" + token;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                dataType: "json",
                cache: true,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    console.log("Something happened ", err);
                }
            });
        })
    }

    function getHTML(url) {

        return $.get(`/html?url=${url}`)
            .then((data) => {
                return data
            }, (error) => {
                console.log("invalid url: " + url);
            });

    }


    function getAlbumById(id) {
        let url = "https://api.genius.com/albums/" + id + "?access_token=" + token;

        return new Promise((resolve, reject)=>{
            $.ajax({
                url:url,
                dataType: "json",
                cache:true,
                success:function(data){
                    resolve(data);
                }
            })
        })
    }

    function getAmazonProducts(artist, title){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url:`/amazon-product?artist=${artist}&title=${title}`,
                dataType: "json",
                cache: true,
                success: function (data) {
                    resolve(data.result.ItemSearchResponse);
                },
                error: function (err) {
                    console.log("Something happened ", err);
                }
            })
        })
    }

    return {
        getByName,
        getSongById,
        getAlbumById,
        getHTML,
        getAmazonProducts
    };
})();