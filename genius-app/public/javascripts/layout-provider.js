let layoutProvider = (function() {
  function partialLayout(element, htmlToRender) {
    element.html(htmlToRender);
  }
  return {
    partialLayout
  };
})();
