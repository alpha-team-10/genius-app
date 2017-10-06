const token = "1l3dy56GF-qDMuZNFTp0AFWWHdPn7qkDprs5peuXXF1q0wI5QAXbhClYccANbcr_";


let dataservice = (function () {

    function getAmazonProducts(artist, title){
        const serverUrl = "http//localhost:3000/";
        debugger;
        
        $.get(serverUrl +  `amazon-product?artist=${artist}&title=${title}`, (data)=>{
            let data = data.result.ItemSearchResponse;
            console.log("amazon resp", data);    
            return data;            
        })
    }

    function getByName(name) {
        let url = "https://api.genius.com/search?access_token=" +
            token + "&q=" + encodeURIComponent(name);

        return $.get(url)
            // first argument is success callback, second is error 
            .then((data) => {
                return data;
            }, (error) => {
                console.log("invalid url: " + url);
            });

    }

    function getSongById(id) {
        let url = "https://api.genius.com/songs/" + id + "?access_token=" + token;
        
        return $.get(url)
        .then((data) => {
            return data;
        }, (error) => {
            console.log("invalid url: " + url);
        });
    }

    function getAlbumById(id) {
        let url = "https://api.genius.com/albums/" + id + "?access_token=" + token;

        // implement
    }

    return {
        getByName,
        getSongById,
        getAlbumById,
        getAmazonProducts
    };
})();