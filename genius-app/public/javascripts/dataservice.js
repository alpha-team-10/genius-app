const token = "1l3dy56GF-qDMuZNFTp0AFWWHdPn7qkDprs5peuXXF1q0wI5QAXbhClYccANbcr_";


let dataservice = (function () {
    function getByName(name) {
        let url = "https://api.genius.com/search?access_token=" +
            token + "&q=" + encodeURIComponent(name);

        return $.get(url)
            // first argument is success callback, second is error 
            .then((data) => {
                console.log(data);
                return data;
            }, (error) => {
                console.log("invalid url: " + url);
            });

    }

    function getSongById(id) {
        let songUrl = "https://api.genius.com/songs/" + id + "?access_token=" + token;

        // implement
    }

    function getAlbumById(id) {
        let albumUrl = "https://api.genius.com/albums/" + id + "?access_token=" + token;

        // implement
    }

    return {
        getByName,
        getSongById,
        getAlbumById
    };
})();