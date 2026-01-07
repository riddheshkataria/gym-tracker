import User from '../models/User.js'
import generateToken from '../utils/generateToken.js';

const registerUser= async function(req, res, next){
    try
    {
        const {username,email,password}=req.body;
        const user=await User.create({
            username,
            email,
            password
        });
        
        res.status(201).json({
            success:true,
            data:{
                _id:user._id,
                username:user.username,
                email:user.email,
                token: generateToken(user._id)
            }
        });
    }
    catch(error){
        next(error);
    }
};
export default registerUser;

export const loginUser= async(req, res, next)=>{
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email}).select('+password');
        
        if(user && (await user.matchPassword(password))){
            res.json({
                success:true,
                data:{
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    token: generateToken(user._id)
                }
            })
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error){
        next(error);
    }
};