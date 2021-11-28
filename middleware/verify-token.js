const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return  next({ message: 'Failed to authenticate token!', code: 401, status: false}) ;
    }else{
        jwt.verify(token,  process.env.ACCCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return  next({ message: 'Failed to authenticate token!', code: 401, status: false}) ;
            }else{
                req.decode = decoded;
                next();
            }
        });
    }
}