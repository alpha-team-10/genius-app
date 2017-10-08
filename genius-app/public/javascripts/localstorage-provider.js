let localStorageProvider = (function () {
    let localStorage = window.localStorage;
    
    function save(key, data) {
        if (!localStorage[key]) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    function get(key) {
        if(localStorage[key]){
            return JSON.parse(localStorage[key]);
        }
    }

    function containsKey(key){
        return !!localStorage[key];
    }

    return {
        save,
        get,
        containsKey
    }
})();