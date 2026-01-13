import express from 'express';
import { startWorkout , getOngoingWorkout} from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the guard

const router = express.Router();
    router.route('/').post(protect, startWorkout);
    router.get('/ongoing',protect,getOngoingWorkout);
export default router;