console.log("start of req provider");

const token = "1l3dy56GF-qDMuZNFTp0AFWWHdPn7qkDprs5peuXXF1q0wI5QAXbhClYccANbcr_";
const id = "YxrCMr4y7Ph11Z0F6QN88neN-PEkeTXv_8kNgW2o6kWRuFcw2d_SpQlert0wp9kl";


let visualize = (function () {
    function attachToDom(data) {
        console.log(data.response)
        $("#container").html(`<ul>
    <li><a href="#/artist">Artist</a></li>
    <li><a href="#/album">Album</a></li>
    <li><a href="#/artist">Artist</a></li>
</ul>`);
    }

    return {
        attachToDom
    }

})();

let requester = (function () {
    function getByName(query_name) {
        let url = "https://api.genius.com/search&q=" + encodeURIComponent("Kendrick lamar") + "?access_token=" + token;


        let urlSong = "https://api.genius.com/songs/378195?access_token=" + token;
        let albumUrl = "https://api.genius.com/albums/104614?access_token=" + token;

        let promise = new Promise((resolve, reject) => {
            //     $.get(url,(data)=>{
            //         console.log(data);
            //         resolve(data);
            //     });

            // $.ajax({
            //     // headers: {"Authorization" : "Bearer " +  token} ,
            //     url: urlSong,
            //     dataType: 'json',
            //     success: function(data){
            //         console.log(data);
            //         resolve(data);
            //     }
            // });

            $.ajax({
                url: albumUrl,
                dataType: "json",
                method: "GET",
                // jsonpCallback: function(data){
                //     console.log("adasdsd")
                //     console.log(data);
                //     //resolve(data);
                // },
                success: function (data) {
                    console.log("adasdsd")
                    console.log(data);
                    resolve(data);
                }
            });
        });

        return promise;
    }

    return {
        getByName
    }
})();

$("#search").on('click', function () {
    console.log("clicked")
    requester.getByName()
        .then((data) => {
            data
            visualize.attachToDom(data);
        })
});

