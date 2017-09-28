
const token =
  "1l3dy56GF-qDMuZNFTp0AFWWHdPn7qkDprs5peuXXF1q0wI5QAXbhClYccANbcr_";
const id = "YxrCMr4y7Ph11Z0F6QN88neN-PEkeTXv_8kNgW2o6kWRuFcw2d_SpQlert0wp9kl";


let requestProvider = (function() {
  function searchByName(name) {
    let url =
      "https://api.genius.com/search?access_token=" +
      token + "&q=" + encodeURIComponent(name);

    // let urlSong = "https://api.genius.com/songs/378195?access_token=" + token;
    // let albumUrl = "https://api.genius.com/albums/104614?access_token=" + token;

    let promise = new Promise((resolve, reject) => {
      $.get(url, data => {
        console.log(data);
        resolve(data);
      });

      //   $.ajax({
      //       url: albumUrl,
      //       dataType: "json",
      //       method: "GET",
      //       success: function (data) {
      //           console.log("adasdsd")
      //           console.log(data);
      //           resolve(data);
      //       }
      //   });

    });

    return promise;
  }

  return {
    searchByName
  };
})();

