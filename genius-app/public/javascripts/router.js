const router = (function () {
    let navigo;

    function init() {
        navigo = new Navigo(null, false);

        navigo
            .on('/index', function () {
                templateLoader.get('home')
                    .then(funcTemplate => {
                        let html = funcTemplate();
                        $('#content').html(html);
                    });
                console.log('loaded');
            })
            .on('/instagram/tag=:tag', (params) => {
                instaReq.getTag(params.tag)
                window.scroll(0, 100);
            })
            .on('/instagram/user=:user', (params) => {
                instaReq.getUser(params.user);
            })
            .on('/artist', () => {
                console.log("render selected artist");
            })
            .on('/album', ()=>{
                console.log("render selected album");
            })
    }
    return {
        init
    };
} ());

router.init();
