let express = require('express');
let router = express.Router();

let request = require('request');

router.get('/html', function (req, res, next) {
    let url = req.query.url;

    request(url,function(error, response, html){
       
        if(!error){
            res.send(html);
        }
    });
})

module.exports = router;