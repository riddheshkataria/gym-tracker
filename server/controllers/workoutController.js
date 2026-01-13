import Workout from "../models/Workout.js";

export const startWorkout= async(req,res) =>{
    try{
        const existingWorkout = await Workout.findOne({ 
            user: req.user._id, 
            status: 'ongoing' 
        });
        
        if (existingWorkout) {
            return res.status(400).json({ message: "You already have an active workout!" });
        }

        const workout= await Workout.create({
            user:req.user._id,
            exercises:[]
        });
        res.status(201).json(workout);
    }catch(error){
        res.status(500).json({message: "Failed to start workout"});
    }
};

export const getOngoingWorkout =async(req,res)=>{
    try{
        const workout= await Workout.findOne({
            user:req.user._id,
            status:'ongoing'
        }).populate('exercises.exerciseId');
        res.status(200).json(workout);
    } catch(error){
        res.status(500).json({message: "Error fetching the ongoing workout"});
    }
};