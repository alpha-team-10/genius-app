
let controller = routingController.init(requestProvider)
navigoRouter.init(controller);


$("#search-btn").on("click", function() {
  let searchVal = $("#search-field").val();
  if (searchVal !== "") {
    let redirectUrl = "#/listing/name=" + searchVal;
    window.location = redirectUrl;
  }else {
      window.location = "/index";
  }
});
