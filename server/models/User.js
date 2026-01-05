import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']        
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    }
}, {timestamps: true});
userSchema.pre('save', async function(next) {
   if(!this.isModified('password')){
    return next();
   }
   try{
    const salt= await bcryptjs.genSalt(10);
    this.password= await bcryptjs.hash(this.password, salt);
    next();
   }
   catch(error){
    next(error);
   }
});
const User = mongoose.model('User', userSchema);
export default User;