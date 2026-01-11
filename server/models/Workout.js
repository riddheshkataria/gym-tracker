import mongoose from "mongoose";

const setSchema= mongoose.Schema({
    weight:{type: Number, default: 0},
    reps: {type: Number, default: 0},
    isCompleted: {type: Boolean, default:false},
    setType:{
        type:String,
        enum:['warmup','normal','dropset','failure'],
        default: 'normal'
    }
});

const workoutExerciseSchema= mongoose.Schema({
    exerciseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Exercise',
        required:true
    },
    sets: [setSchema]
});

const workoutSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type: String,
        default: () => `Workout ${new Date().toLocaleDateString()}`
    },
    exercises: [workoutExerciseSchema],
    status:{
        type:String,
        enum:['ongoing','completed'],
        default:'ongoing'
    },
    duration:{
        type:Number,
        default:0
    },
    notes:{type: String}
}, {
    timestamps:true
});

const Workout= mongoose.model('Workout', workoutSchema);

export default Workout;