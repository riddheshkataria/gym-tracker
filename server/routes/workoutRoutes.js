import express from 'express';
import { startWorkout } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the guard

const router = express.Router();
    router.route('/').post(protect, startWorkout);

export default router;