import Workout from "../models/Workout.js";

export const startWorkout= async(req,res) =>{
    try{
        const workout= await Workout.create({
            user:req.user._id,
            exercises:[]
        });
    }catch(error){
        res.status(500).json({message: "Failed to start workout"});
    }
};