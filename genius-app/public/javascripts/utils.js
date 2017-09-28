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

    return {
        isAlbum
    };
})();