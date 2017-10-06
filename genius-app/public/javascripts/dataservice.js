const token = "1l3dy56GF-qDMuZNFTp0AFWWHdPn7qkDprs5peuXXF1q0wI5QAXbhClYccANbcr_";

let dataservice = function (localStorageProvider) {

    console.log("localstorageprovider ", localStorageProvider);

    function getByName(name) {
        let url = "https://api.genius.com/search?access_token=" +
            token + "&q=" + encodeURIComponent(name);

        let storageKey = "listing-" + name;

        if (localStorageProvider.containsKey(storageKey)) {
            return new Promise((resolve, reject) => {
                resolve(localStorageProvider.get(storageKey));
            });
        } else {
            return $.get(url)
                // first argument is success callback, second is error 
                .then((data) => {
                    localStorageProvider.save(storageKey, data);
                    return data;
                }, (error) => {
                    console.log("invalid url: " + url);
                });
        }
    }

    function getSongById(id) {
        let url = "https://api.genius.com/songs/" + id + "?access_token=" + token;

        return $.get(url)
            .then((data) => {
                return data
            }, (error) => {
                console.log("invalid url: " + url);
            });
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
        //url = "https://genius.com/Kendrick-lamar-damn-tracklist-album-art-lyrics";
        // let url = "https://genius.com/albums/Kendrick-lamar/Damn";
        return $.get(url)
            .then(data => {
                return data;
            })
    }

    return {
        getByName,
        getSongById,
        getAlbumById,
        getHTML
    };
};