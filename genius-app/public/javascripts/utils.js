let utils = (function() {

    // check the title for these substrings
    const albumSubstrings = ["tracklist", "album"];

    function isAlbum(data) {
        if (data && data.result) {
            pieceName = JSON.stringify(data.result["full_title"]).toLowerCase();

            isAlbum = albumSubstrings.some(a => {
                return pieceName.indexOf(a) >= 0;
            });
            return isAlbum;
        }
        return false;
    }

    function numberWithLetter(num) {
        // bilion
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }
  
    // Album functions

    function wordContainsOnlyLetters(str) {
        return !!str.match(/^[a-zA-Z]+$/);
    }

    function capitalizeFirstLetter(albumName) {
        return albumName.charAt(0).toUpperCase() + albumName.slice(1);
    }

    function splitMulti(str, tokens){
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for(var i = 0; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    }

    return {
        isAlbum,
        numberWithLetter,        
        wordContainsOnlyLetters,
        capitalizeFirstLetter,
        splitMulti
    }
})();