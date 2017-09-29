let express = require('express');
let router = express.Router();
const { OperationHelper } = require('apac');

const amazon_access_key = "AKIAJHWP5OY6BMU7EP2A";
const amazon_secret_key = "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";
const aws_tag = "teamworkjs-21";


const opHelper = new OperationHelper({
    awsId: amazon_access_key,
    awsSecret: amazon_secret_key,
    assocId: aws_tag,
    locale: "UK"
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('index.html');
});

router.get('/az', (req, res, next) => {

    opHelper.execute('ItemSearch', {
        'SearchIndex': 'Music',
        'Artist': 'kendrick lamar',
        'Title': "DAMN."
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });

})

module.exports = router;