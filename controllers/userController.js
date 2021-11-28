const Users  = require("../models/Users"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = (req, res, next) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        
        const user = new Users({
            username : username,
            password: hash
        });
    
        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            return  next({ message: err, code: 500 }) ;
        })

    });
}

const login = (req, res, next) => {
    const { username, password } = req.body;

    Users.findOne({
        username
    }, (err, user) => {
        if(err){
            throw err;
        }
          
        if(!user){
            return  next({ message: 'Authentication failed, user not found', code: 401, status: false }) ;
        }else{
            
            bcrypt.compare(password, user.password).then((result) => {
                if(!result){
                    return  next({ message: 'Authentication failed, wrong password', code: 401, status: false }) ;
                }else{
                   const payload = { 
                       username
                   };
                   const accessToken = jwt.sign(payload,  process.env.ACCCESS_TOKEN_SECRET, {
                       expiresIn: 720 // 12 saat (dakika)
                   });
                   res.json({ status: true, token: accessToken }); 
                }
            });

        }
    });


}


module.exports = { register, login }