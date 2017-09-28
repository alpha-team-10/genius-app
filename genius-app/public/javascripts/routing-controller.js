let $container = $("#container");

let routingController = (function() {

  function listing(name) {
    let pendingData = null;
    requestProvider.searchByName(name)
      .then(data => {
        pendingData = data;
        return templateLoader.get("listing");
      })
      .then(funcTemplate => {
        let compiledHtml = funcTemplate(pendingData);
        console.log("pending ", pendingData);
        layoutProvider.partialLayout($container,compiledHtml);
      });
  }

  function artist() {}

  function album() {}

  return {
    listing,
    artist,
    album
  };
})();
