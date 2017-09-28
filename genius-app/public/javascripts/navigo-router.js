const navigoRouter = (function() {
  let navigo = new Navigo(null, false);

  function init(routingController) {
    console.log("router initialized " + new Date(Date.now()).getMinutes());

    navigo
      .on(()=>{
        console.log("home");
      })
      .on("/listing/name=:name", (params) => {
        let name = params.name;

        console.log("routing ", name);
        routingController.listing(name);
      })
      .on("/song/:id", (params) => {
        let id = params.id;

        console.log("artist with id " + id);
      })
      .on("/album/:id", (params) => {
        let id = params.id;

        console.log("album with id " + id);
      })
      .resolve();
  }

  return {
    init
  }
})();
