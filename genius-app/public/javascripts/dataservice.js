const token = "1l3dy56GF-qDMuZNFTp0AFWWHdPn7qkDprs5peuXXF1q0wI5QAXbhClYccANbcr_";


let dataservice = (function () {
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
        

        // implement
        
        let url = "https://api.genius.com/songs/" + id + "?access_token=" + token;
        
            return $.get(url)
                    .then(data=>{                       
                        return data;
                    })
    }
    

    function getAlbumById(id) {
        let url = "https://api.genius.com/albums/" + id + "?access_token=" + token;
        //url = "https://genius.com/Kendrick-lamar-damn-tracklist-album-art-lyrics";
        // let url = "https://genius.com/albums/Kendrick-lamar/Damn";
         return $.get(url)
         .then(data=>{                     
            return data;
         })               
    }

    return {
        getByName,
        getSongById,
        getAlbumById,
      
    };
})();