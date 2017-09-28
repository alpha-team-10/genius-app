const navigoRouter = (function() {
  console.log("router initialized " + new Date(Date.now()).getMinutes())
  let navigo = new Navigo(null, false);

  navigo
    .on("/listing/name=:name", params => {
      let name = params.name;
      console.log("routing ", name);
      routingController.listing(name);
    })
    .on("/artist", () => {
      console.log("render selected artist");
    })
    .on("/album", () => {
      console.log("render selected album");
    })
    .resolve();
})();
