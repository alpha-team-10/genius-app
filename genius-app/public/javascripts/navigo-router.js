const navigoRouter = function(routingController) {
    let navigo = new Navigo(null, false);

    function init() {
        navigo
            .on("/listing/name=:name", (params) => {
                let name = params.name;

                console.log("routing ", name);
                routingController.listing(name);
            })
            .on("/song/:id", (params) => {
                let id = params.id;

                // delete below and implement
                routingController.song(id);
                console.log("song with id " + id);
            })
            .on("/album/:id", (params) => {
                let id = params.id;

                // delete below and implement
                routingController.album(id);
                console.log("album with id " + id);
            })
            .resolve();
    }

    return {
        init
    }
};