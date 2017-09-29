let utils = (function() {
    const albumSubstrings = [" tracklist ", " album "];

    function isAlbum(data) {
        if (data) {
            pieceName = JSON.stringify(data.result["full_title"]).toLowerCase();

            isAlbum = albumSubstrings.some(a => {
                return pieceName.indexOf(a) >= 0;
            });
            return isAlbum;
        }
        return false;
    }

    function numberWithLetter(num) {
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

    return {
        isAlbum,
        numberWithLetter
    };
})();