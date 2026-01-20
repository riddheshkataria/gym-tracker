import express from 'express';
import { 
    startWorkout, 
    getOngoingWorkout,
    addExerciseToWorkout,
    finishWorkout
} from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
    router.route('/').post(protect, startWorkout);
    router.get('/ongoing',protect,getOngoingWorkout);
    router.route('/:id/add').put(protect, addExerciseToWorkout);
    router.route('/:id/finish').put(protect, finishWorkout);
export default router;