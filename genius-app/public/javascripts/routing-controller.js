let $container = $("#container");

let routingController = (function() {
  let requester;
  // layout provider

  function init(requestProvider) {
    requester = requestProvider;
    return this;
  }

  function listing(name) {
    let pendingData = null;
    requester
      .searchByName(name)
      .then(data => {
        pendingData = data;
        pendingData.response.hits.map(hit => {
          hit.type = utils.isAlbum(hit) ? "album" : "song";
        });

        console.log("modified data ", pendingData);
        return templateLoader.get("listing");
      })
      .then(funcTemplate => {
        let compiledHtml = funcTemplate(pendingData);
        console.log("pending ", pendingData);
        layoutProvider.partialLayout($container, compiledHtml);
      });
  }

  function artist() {}

  function album() {}

  return {
    init,
    listing,
    artist,
    album
  };
})();
