let layoutProvider = (function() {
    function partialLayout($jqElement, htmlToRender) {
        if ($jqElement) {
            $jqElement.html(htmlToRender);
        } else {
            throw "provided jQuery element was undefined";
        }
    }
    return {
        partialLayout
    };
})();