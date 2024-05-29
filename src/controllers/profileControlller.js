import User from "../models/user.js";

export const getProfile = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req,res,next)=>{
    try{
        const updates= req.body;
        if(req.file){
            updates.profilePicture = req.file.path;
        }

        const user = await User.findByIdAndUpdate(req.user.id , updates,{new:true})
        res.status(200).send(user);
    }
    catch(err){
        next(err);
    }
}

export const listPublicProfiles = async(req,res,next)=>{
    try{
        const users = await User.find({isPublic :true});
        res.status(200).send(users);
    }
    catch(err){
        next(err);
    }
}

export const getUserProfile = async(req,res,next)=>{
    try{
        const user= await User.findById(req.params.id);
        if(!user.isPublic && req.user.role != 'admin'){
            return res.status(403).send({message:'Accesss denied'});
        }
        res.status(200).send(user);
    }
    catch(err){
        next(err);
    }
};