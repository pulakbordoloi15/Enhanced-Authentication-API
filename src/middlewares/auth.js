import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const jwtAuth = async(req,res,next) =>{
    let token;
    //1.Read the token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);
    //2.If no token , return the error
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    //3.Check if the token is valid
    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = await User.findById(payload.id);
        next();
    }
    catch(err){
        return res.status(401).send('Not authorized')
    }

};
export const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
