import mongoose from 'mongoose'

const ALL_MUSCLES=[
    'Upper Chest', 'Middle Chest', 'Lower Chest',
    'Lats', 'Upper Back', 'Lower Back', 'Traps',
    'Quads', 'Hamstrings', 'Glutes', 'Calves',
    'Front Delts', 'Side Delts', 'Rear Delts',
    'Biceps', 'Triceps', 'Forearms',
    'Abs', 'Obliques', 'Lower Abs',
    'Adductors', 'Abductors', 'Hip Flexors'
];

const exerciseSchema= mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },

    muscleGroup:{
        type: String,
        required:true,
        enum:['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio']
    },

    musclesHit:[{
        muscle:{
            type: String,
            required: true,
            enum: ALL_MUSCLES
        },

        impact:{
            type: Number,
            required: true,
            min: 0,
            max: 1,
            default: 1.0 
        }
    }],

    equipment:{
        type: String,
        required: true,
        enum: ['Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cables', 'Kettlebell', 'None'],
        default:'None'
    },

    description:{
        type:String
    }
},{
    timestamps:true
});

const Exercise=mongoose.model('Exercise', exerciseSchema);

export default Exercise;