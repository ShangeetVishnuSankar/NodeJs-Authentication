const router = require('express').Router();
const verify = require('./varifyToken');

router.get('/', verify, (req,res)=>{
    res.json({posts:{
        title: 'Hello',
            description : 'random post'
        }});
});
module.exports = router;