const jwt = require('jsonwebtoken');

//middleware that can be used in routes that need to be protected
module.exports = function(req,res,next){
    const token = req.header('auth.token');
    if(!token) res.status(401).send('access denied');

    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    }catch (e) {
        res.status(401).send("incorrect token");
    }
}