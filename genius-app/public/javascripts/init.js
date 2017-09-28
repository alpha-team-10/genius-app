$("#search-btn").on('click', function(){
    let searchVal = $('#search-field').val();
    let redirectUrl = '#/listing/name=' + searchVal;
    window.location = redirectUrl;
})