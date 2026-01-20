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

export const addExerciseToWorkout= async(req,res)=>{
    try{
        const workout= await Workout.findById(req.params.id);

        if (!workout) return res.status(404).json({ message: "Workout not found" });
        const newExercise={
            exerciseId:req.body.exerciseId,
            sets:[{weight:0, reps:0}]
        };

        if (workout.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to edit this workout" });
        }

        workout.exercises.push(newExercise);
        await workout.save();

        const updatedWorkout = await Workout.findById(workout._id).populate('exercises.exerciseId');
        res.status(200).json(updatedWorkout);
    }   catch(error){
        res.status(500).json({message: "Failed to add exercise"});
    }
};

export const finishWorkout= async(req,res)=>{
    try{
        const workout= await Workout.findById(req.params.id);
        
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        if (workout.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        workout.status = 'completed';
        workout.finishedAt = Date.now();
        
        await workout.save();
        res.status(200).json({ message: "Workout completed successfully", workout });

    } catch(error){
        res.status(500).json({message: "Failed to finish workout"});
    }
};