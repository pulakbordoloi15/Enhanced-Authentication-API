import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async(req,res,next)=>{
    const { name, email, password}= req.body
    try{
        const user = await User.create({name, email, password});
        const token =jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: '1d'});
        res.status(201).json({token});
    }
    catch(err){
        next(err);
    }
} 

export const login = async (req,res,next)=>{
    const {email, password} = req.body;
    try{
        //1.Find the email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send('Incorrect Credentials');
        }
        else{
            //2. Compare password with hashed password.
            const result = await bcrypt.compare(password,user.password);
            if(result){
                //3. Create token.
                const token = jwt.sign(
                    {
                        id:user._id,
                        email:user.email,
                    },
                    process.env.JWT_SECRET
                    ,
                    {
                        expiresIn:'1d',
                    }
                );

                //4. Sending token
                return res.status(200).send(token);
            }
            else{
                return res
        .status(400)
        .send('Incorrect Credentials');
            }
            }
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    export const logout = (req,res)=>{
        req.logout();
        res.status(200).send('Logged out successfully')
    }
