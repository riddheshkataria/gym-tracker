import Exercise from '../models/Exercise.js'

export const getExercises= async(req, res)=>{
    try{
        const exercises= await Exercise.find({});
        res.status(200).json();
    }   catch (error){
        res.status(500).json({message: "Failed to fetch exercises"});
    }
};