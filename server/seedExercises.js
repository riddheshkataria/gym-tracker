import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Exercise from './models/Exercise.js'

dotenv.config();
connectDB();
const exercises = [
  {
    name: "Barbell Bench Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.9 },
      { muscle: "Upper Chest", impact: 0.4 },
      { muscle: "Triceps", impact: 0.4 }
    ],
    equipment: "Barbell",
    description: "A lying pressing movement where you lower a barbell to the chest then press it up."
  },
  {
    name: "Incline Dumbbell Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Upper Chest", impact: 0.85 },
      { muscle: "Front Delts", impact: 0.45 },
      { muscle: "Middle Chest", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Press dumbbells from shoulder level on an incline bench upward."
  },
  {
    name: "Decline Barbell Bench Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Lower Chest", impact: 0.9 },
      { muscle: "Middle Chest", impact: 0.45 },
      { muscle: "Triceps", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Performed on a decline bench by pressing a barbell away from the chest."
  },
  {
    name: "Dumbbell Flye",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.8 },
      { muscle: "Upper Chest", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Open arms wide on a bench and bring dumbbells together above the chest."
  },
  {
    name: "Cable Crossover",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.8 },
      { muscle: "Lower Chest", impact: 0.4 }
    ],
    equipment: "Cables",
    description: "Using cable pulleys, bring handles together in front of the chest."
  },
  {
    name: "Machine Chest Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.8 },
      { muscle: "Triceps", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "Seated pressing movement on a chest press machine."
  },
  {
    name: "Push-Up",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.75 },
      { muscle: "Triceps", impact: 0.45 },
      { muscle: "Front Delts", impact: 0.35 }
    ],
    equipment: "Bodyweight",
    description: "A bodyweight pressing exercise performed by lowering and raising the body."
  },
  {
    name: "Incline Push-Up",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Upper Chest", impact: 0.75 },
      { muscle: "Triceps", impact: 0.35 }
    ],
    equipment: "Bodyweight",
    description: "Push-up variation with hands elevated on a bench or platform."
  },
  {
    name: "Pec Deck Fly",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.8 },
      { muscle: "Upper Chest", impact: 0.35 }
    ],
    equipment: "Machine",
    description: "Seated machine fly where arms move in an arc."
  },
  {
    name: "Close-Grip Barbell Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.7 },
      { muscle: "Triceps", impact: 0.6 }
    ],
    equipment: "Barbell",
    description: "Bench press with a narrower grip to increase triceps involvement."
  },
  {
    name: "Pull-Up",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.9 },
      { muscle: "Upper Back", impact: 0.5 },
      { muscle: "Biceps", impact: 0.4 }
    ],
    equipment: "None",
    description: "Hanging from a bar, pull the body up until chin clears the bar."
  },
  {
    name: "Chin-Up",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.8 },
      { muscle: "Biceps", impact: 0.6 },
      { muscle: "Upper Back", impact: 0.35 }
    ],
    equipment: "None",
    description: "Underhand grip pull-up emphasizing biceps and lower lats."
  },
  {
    name: "Lat Pulldown",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.9 },
      { muscle: "Upper Back", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Seated machine exercise pulling a bar down to the chest."
  },
  {
    name: "Bent-Over Barbell Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.85 },
      { muscle: "Lats", impact: 0.6 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Hinge at the hips and pull a barbell toward the lower chest."
  },
  {
    name: "One-Arm Dumbbell Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.8 },
      { muscle: "Upper Back", impact: 0.45 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Supporting the body on a bench, row a dumbbell with one arm."
  },
  {
    name: "Seated Cable Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.8 },
      { muscle: "Lats", impact: 0.5 }
    ],
    equipment: "Cables",
    description: "Seated row on a cable machine pulling a handle toward the torso."
  },
  {
    name: "T-Bar Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.85 },
      { muscle: "Lats", impact: 0.5 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Standing hinge row pulling a barbell T-handle toward the mid-chest."
  },
  {
    name: "Face Pull",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.75 },
      { muscle: "Rear Delts", impact: 0.6 },
      { muscle: "Traps", impact: 0.35 }
    ],
    equipment: "Cables",
    description: "Pull the rope attachment toward the face with elbows high."
  },
  {
    name: "Hyperextension (Back Extension)",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lower Back", impact: 0.85 },
      { muscle: "Glutes", impact: 0.4 },
      { muscle: "Hamstrings", impact: 0.35 }
    ],
    equipment: "Machine",
    description: "Extend the spine upward to strengthen lower back and glutes."
  },
  {
    name: "Straight-Arm Pulldown",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.8 },
      { muscle: "Upper Back", impact: 0.35 }
    ],
    equipment: "Cables",
    description: "Standing cable movement with arms straight to isolate lats."
  },
  {
    name: "Back Squat",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.8 },
      { muscle: "Hamstrings", impact: 0.45 }
    ],
    equipment: "Barbell",
    description: "Barbell placed on the back while squatting down."
  },
  {
    name: "Front Squat",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.9 },
      { muscle: "Upper Back", impact: 0.4 },
      { muscle: "Glutes", impact: 0.4 }
    ],
    equipment: "Barbell",
    description: "Barbell rests on the front of the shoulders as you squat."
  },
  {
    name: "Leg Press",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.85 },
      { muscle: "Glutes", impact: 0.5 },
      { muscle: "Hamstrings", impact: 0.35 }
    ],
    equipment: "Machine",
    description: "Seated or angled press pushing a platform away with feet."
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Hamstrings", impact: 0.9 },
      { muscle: "Glutes", impact: 0.6 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Hinge at the hips to lower the barbell with slight knee bend."
  },
  {
    name: "Walking Lunges",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.6 },
      { muscle: "Hamstrings", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Step forward into a lunge while holding dumbbells."
  },
  {
    name: "Bulgarian Split Squat",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.85 },
      { muscle: "Glutes", impact: 0.6 }
    ],
    equipment: "Dumbbell",
    description: "Rear foot elevated on a bench while performing a single-leg squat."
  },
  {
    name: "Leg Extension",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.9 }
    ],
    equipment: "Machine",
    description: "Seated machine exercise extending the knees to work quads."
  },
  {
    name: "Seated Leg Curl",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Hamstrings", impact: 0.9 }
    ],
    equipment: "Machine",
    description: "Curl the lower legs toward the glutes to isolate hamstrings."
  },
  {
    name: "Standing Calf Raise",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Calves", impact: 0.95 }
    ],
    equipment: "Machine",
    description: "Rise onto the toes to work the calf muscles."
  },
  {
    name: "Hip Thrust",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Glutes", impact: 0.95 },
      { muscle: "Hamstrings", impact: 0.4 }
    ],
    equipment: "Barbell",
    description: "Drive hips upward with a loaded barbell to target glutes."
  },
  {
    name: "Romanian Dumbbell Deadlift",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Hamstrings", impact: 0.85 },
      { muscle: "Glutes", impact: 0.6 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Hinge at the hips with dumbbells sliding along the thighs."
  },
  {
    name: "Kettlebell Goblet Squat",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.6 }
    ],
    equipment: "Kettlebell",
    description: "Hold a kettlebell close to the chest and perform a deep squat."
  },
  {
    name: "Overhead Barbell Press",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Front Delts", impact: 0.85 },
      { muscle: "Side Delts", impact: 0.6 },
      { muscle: "Traps", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Press a barbell overhead from the shoulders."
  },
  {
    name: "Seated Dumbbell Shoulder Press",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Front Delts", impact: 0.85 },
      { muscle: "Side Delts", impact: 0.5 }
    ],
    equipment: "Dumbbell",
    description: "Seated press with dumbbells overhead from shoulder height."
  },
  {
    name: "Lateral Raise",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Side Delts", impact: 0.9 },
      { muscle: "Front Delts", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Raise dumbbells out to the sides to shoulder height."
  },
  {
    name: "Rear Delt Fly (Dumbbell)",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Rear Delts", impact: 0.9 },
      { muscle: "Upper Back", impact: 0.45 }
    ],
    equipment: "Dumbbell",
    description: "Hinge at hips and raise dumbbells focusing on rear delts."
  },
  {
    name: "Arnold Press",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Front Delts", impact: 0.8 },
      { muscle: "Side Delts", impact: 0.6 },
      { muscle: "Rear Delts", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Rotate dumbbells while pressing overhead to hit all heads."
  },
  {
    name: "Upright Row",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Traps", impact: 0.8 },
      { muscle: "Side Delts", impact: 0.45 },
      { muscle: "Front Delts", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Pull a barbell vertically toward the chin."
  },
  {
    name: "Cable Lateral Raise",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Side Delts", impact: 0.85 },
      { muscle: "Front Delts", impact: 0.35 }
    ],
    equipment: "Cables",
    description: "Using a single cable, raise the arm laterally."
  },
  {
    name: "Machine Shoulder Press",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Front Delts", impact: 0.8 },
      { muscle: "Side Delts", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Seated pressing on a machine that guides the upward motion."
  },
  {
    name: "Front Dumbbell Raise",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Front Delts", impact: 0.9 },
      { muscle: "Side Delts", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Raise a dumbbell in front of the body to shoulder height."
  },
  {
    name: "Bent-Over Cable Rear Delt Fly",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Rear Delts", impact: 0.85 },
      { muscle: "Upper Back", impact: 0.4 }
    ],
    equipment: "Cables",
    description: "Pull handles across the body in a bent-over position."
  },
  {
    name: "Barbell Curl",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Biceps", impact: 0.9 },
      { muscle: "Forearms", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Stand and curl a barbell upward by flexing the elbows."
  },
  {
    name: "Dumbbell Hammer Curl",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Biceps", impact: 0.8 },
      { muscle: "Forearms", impact: 0.6 }
    ],
    equipment: "Dumbbell",
    description: "Curl dumbbells with a neutral grip to hit brachialis."
  },
  {
    name: "Preacher Curl (Machine)",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Biceps", impact: 0.9 }
    ],
    equipment: "Machine",
    description: "Isolate the biceps by curling with upper arms supported."
  },
  {
    name: "Concentration Curl",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Biceps", impact: 0.9 }
    ],
    equipment: "Dumbbell",
    description: "Seated single-arm curl with elbow braced against thigh."
  },
  {
    name: "Triceps Pushdown (Cable)",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Triceps", impact: 0.9 },
      { muscle: "Forearms", impact: 0.35 }
    ],
    equipment: "Cables",
    description: "Push a bar or rope downward to isolate triceps."
  },
  {
    name: "Skull Crusher (Lying Triceps Extension)",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Triceps", impact: 0.9 }
    ],
    equipment: "Barbell",
    description: "Lying on a bench, lower barbell toward forehead."
  },
  {
    name: "Dip (Parallel Bars)",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Triceps", impact: 0.85 },
      { muscle: "Middle Chest", impact: 0.45 }
    ],
    equipment: "Bodyweight",
    description: "Lower body between bars and press back up using triceps."
  },
  {
    name: "Overhead Dumbbell Triceps Extension",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Triceps", impact: 0.9 }
    ],
    equipment: "Dumbbell",
    description: "Hold dumbbell overhead and lower behind the head."
  },
  {
    name: "Reverse Barbell Curl",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Forearms", impact: 0.8 },
      { muscle: "Biceps", impact: 0.5 }
    ],
    equipment: "Barbell",
    description: "Curl a barbell with an overhand grip for forearms."
  },
  {
    name: "Wrist Curl (Seated)",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Forearms", impact: 0.9 }
    ],
    equipment: "Barbell",
    description: "Seated forearm curl with forearms supported."
  },
  {
    name: "Hammer Strength Preacher Curl",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Biceps", impact: 0.85 }
    ],
    equipment: "Machine",
    description: "Machine-based preacher curl to isolate the biceps."
  },
  {
    name: "Plank",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Abs", impact: 0.9 },
      { muscle: "Lower Abs", impact: 0.6 }
    ],
    equipment: "None",
    description: "Isometric hold in a prone position on forearms and toes."
  },
  {
    name: "Hanging Leg Raise",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Lower Abs", impact: 0.9 },
      { muscle: "Abs", impact: 0.5 },
      { muscle: "Hip Flexors", impact: 0.35 }
    ],
    equipment: "None",
    description: "Raise legs toward chest to load lower abs."
  },
  {
    name: "Cable Woodchopper",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Obliques", impact: 0.9 },
      { muscle: "Abs", impact: 0.45 }
    ],
    equipment: "Cables",
    description: "Rotational cable movement to train obliques."
  },
  {
    name: "Russian Twist",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Obliques", impact: 0.85 },
      { muscle: "Abs", impact: 0.5 }
    ],
    equipment: "None",
    description: "Seated core rotation to work obliques."
  },
  {
    name: "Ab Wheel Rollout",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Abs", impact: 0.9 },
      { muscle: "Lower Back", impact: 0.4 }
    ],
    equipment: "None",
    description: "Roll forward with an ab wheel keeping the core braced."
  },
  {
    name: "Bicycle Crunch",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Abs", impact: 0.8 },
      { muscle: "Obliques", impact: 0.6 }
    ],
    equipment: "None",
    description: "Alternating elbow-to-opposite-knee movement."
  },
  {
    name: "Hanging Knee Tuck",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Lower Abs", impact: 0.85 },
      { muscle: "Abs", impact: 0.45 }
    ],
    equipment: "None",
    description: "Tuck knees toward chest to emphasize lower abs."
  },
  {
    name: "Dragon Flag",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Abs", impact: 0.9 },
      { muscle: "Lower Abs", impact: 0.6 }
    ],
    equipment: "Bodyweight",
    description: "Advanced move lowering and raising body in a straight line."
  },
  {
    name: "Side Plank",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Obliques", impact: 0.9 },
      { muscle: "Abs", impact: 0.4 }
    ],
    equipment: "None",
    description: "Lateral isometric hold supporting body on one forearm."
  },
  {
    name: "Mountain Climbers",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Abs", impact: 0.75 },
      { muscle: "Lower Abs", impact: 0.5 },
      { muscle: "Quads", impact: 0.35 }
    ],
    equipment: "None",
    description: "Drive knees toward chest in a dynamic plank position."
  },
  {
    name: "Kettlebell Swing",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Glutes", impact: 0.85 },
      { muscle: "Hamstrings", impact: 0.6 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Kettlebell",
    description: "Swing a kettlebell using explosive hip drive."
  },
  {
    name: "Barbell Clean",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.8 },
      { muscle: "Upper Back", impact: 0.6 }
    ],
    equipment: "Barbell",
    description: "Explosive pull to bring barbell to front rack."
  },
  {
    name: "Dumbbell Thruster",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Quads", impact: 0.75 },
      { muscle: "Front Delts", impact: 0.7 },
      { muscle: "Glutes", impact: 0.45 }
    ],
    equipment: "Dumbbell",
    description: "Combine a front squat with an overhead press."
  },
  {
    name: "Barbell Deadlift",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Hamstrings", impact: 0.85 },
      { muscle: "Lower Back", impact: 0.8 },
      { muscle: "Glutes", impact: 0.8 }
    ],
    equipment: "Barbell",
    description: "Lift a barbell from floor to standing by extending hips."
  },
  {
    name: "Farmer's Carry",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Forearms", impact: 0.8 },
      { muscle: "Traps", impact: 0.6 },
      { muscle: "Glutes", impact: 0.4 }
    ],
    equipment: "Dumbbell",
    description: "Hold heavy weights and walk a distance."
  },
  {
    name: "Thruster (Barbell)",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Front Delts", impact: 0.75 },
      { muscle: "Glutes", impact: 0.45 }
    ],
    equipment: "Barbell",
    description: "Front squat into an overhead press with a barbell."
  },
  {
    name: "Turkish Get-Up",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Front Delts", impact: 0.75 },
      { muscle: "Glutes", impact: 0.6 },
      { muscle: "Abs", impact: 0.45 }
    ],
    equipment: "Kettlebell",
    description: "Sequence rising from lying to standing with weight."
  },
  {
    name: "Sled Push",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.7 },
      { muscle: "Calves", impact: 0.35 }
    ],
    equipment: "Machine",
    description: "Push a weighted sled across turf using leg drive."
  },
  {
    name: "Burpee",
    muscleGroup: "Cardio",
    musclesHit: [
      { muscle: "Quads", impact: 0.6 },
      { muscle: "Middle Chest", impact: 0.35 },
      { muscle: "Abs", impact: 0.5 }
    ],
    equipment: "None",
    description: "Combine a squat, plank, push-up, and jump."
  },
  {
    name: "Treadmill Sprint",
    muscleGroup: "Cardio",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Calves", impact: 0.6 },
      { muscle: "Hamstrings", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "High-intensity sprint intervals on a treadmill."
  },
  {
    name: "Stationary Bike (Intervals)",
    muscleGroup: "Cardio",
    musclesHit: [
      { muscle: "Quads", impact: 0.85 },
      { muscle: "Calves", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Perform high-intensity intervals on a stationary bike."
  },
  {
    name: "Rowing Machine Sprint",
    muscleGroup: "Cardio",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.6 },
      { muscle: "Quads", impact: 0.6 },
      { muscle: "Hamstrings", impact: 0.5 }
    ],
    equipment: "Machine",
    description: "Explosive rowing intervals engaging the full body."
  },
  {
    name: "Jump Rope",
    muscleGroup: "Cardio",
    musclesHit: [
      { muscle: "Calves", impact: 0.85 },
      { muscle: "Quads", impact: 0.4 }
    ],
    equipment: "None",
    description: "Rhythmic jumping over a rope for conditioning."
  },
  {
    name: "Assault Bike Intervals",
    muscleGroup: "Cardio",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Abs", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "High-intensity intervals on an air-assist bike."
  },
  {
    name: "Battle Ropes",
    muscleGroup: "Cardio",
    musclesHit: [
      { muscle: "Side Delts", impact: 0.6 },
      { muscle: "Abs", impact: 0.5 },
      { muscle: "Traps", impact: 0.4 }
    ],
    equipment: "None",
    description: "Rope waves performed explosively for conditioning."
  },
  {
    name: "Kettlebell Farmer Carry",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Forearms", impact: 0.8 },
      { muscle: "Traps", impact: 0.5 },
      { muscle: "Glutes", impact: 0.4 }
    ],
    equipment: "Kettlebell",
    description: "Carry heavy kettlebells in each hand and walk."
  },
  {
    name: "Smith Machine Squat",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.6 }
    ],
    equipment: "Machine",
    description: "Squat variation using the Smith machine for guidance."
  },
  {
    name: "Incline Barbell Bench Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Upper Chest", impact: 0.9 },
      { muscle: "Front Delts", impact: 0.45 }
    ],
    equipment: "Barbell",
    description: "Barbell press on an incline bench to hit upper chest."
  },
  {
    name: "Cable Rear Delt Fly",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Rear Delts", impact: 0.85 },
      { muscle: "Upper Back", impact: 0.45 }
    ],
    equipment: "Cables",
    description: "Cross-body cable movement to isolate rear deltoids."
  },
  {
    name: "Smith Machine Bench Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.85 },
      { muscle: "Triceps", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Guided barbell bench press on a Smith machine."
  },
  {
    name: "Single-Leg Romanian Deadlift (Dumbbell)",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Hamstrings", impact: 0.8 },
      { muscle: "Glutes", impact: 0.6 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Dumbbell",
    description: "Single-leg hinge with a dumbbell for balance and strength."
  },
  {
    name: "Cable Triceps Overhead Extension",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Triceps", impact: 0.9 }
    ],
    equipment: "Cables",
    description: "Cable extension overhead to hit triceps long head."
  },
  {
    name: "Incline Dumbbell Flye",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Upper Chest", impact: 0.8 },
      { muscle: "Middle Chest", impact: 0.4 }
    ],
    equipment: "Dumbbell",
    description: "Flyes on an incline bench to emphasize upper chest."
  },
  {
    name: "Smith Machine Romanian Deadlift",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Hamstrings", impact: 0.85 },
      { muscle: "Glutes", impact: 0.5 }
    ],
    equipment: "Machine",
    description: "Hinge with the Smith bar to load hamstrings."
  },
  {
    name: "Cable Lateral Pulldown",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.8 },
      { muscle: "Upper Back", impact: 0.35 }
    ],
    equipment: "Cables",
    description: "Standing or kneeling cable pulldown toward the hips."
  },
  {
    name: "Single-Leg Press",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.85 },
      { muscle: "Glutes", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Perform leg press one leg at a time to address imbalances."
  },
  {
    name: "Chest-Supported Dumbbell Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.85 },
      { muscle: "Lats", impact: 0.45 }
    ],
    equipment: "Dumbbell",
    description: "Lying face-down on incline bench, row dumbbells."
  },
  {
    name: "Sissy Squat",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.9 }
    ],
    equipment: "Machine",
    description: "Knee-dominant squat to heavily target the quads."
  },
  {
    name: "Smith Machine Hip Thrust",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Glutes", impact: 0.9 },
      { muscle: "Hamstrings", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "Hip thrust using Smith machine for guided path."
  },
  {
    name: "Incline Cable Fly",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Upper Chest", impact: 0.85 },
      { muscle: "Middle Chest", impact: 0.4 }
    ],
    equipment: "Cables",
    description: "Set cables low and bring handles together on incline bench."
  },
  {
    name: "Cable Face Pull High",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Traps", impact: 0.7 },
      { muscle: "Rear Delts", impact: 0.6 },
      { muscle: "Upper Back", impact: 0.4 }
    ],
    equipment: "Cables",
    description: "High cable pull toward face for rear delts and traps."
  },
  {
    name: "Smith Machine Overhead Press",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Front Delts", impact: 0.8 },
      { muscle: "Side Delts", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Guided overhead press movement on a Smith machine."
  },
  {
    name: "Cable Biceps Curl",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Biceps", impact: 0.85 },
      { muscle: "Forearms", impact: 0.35 }
    ],
    equipment: "Cables",
    description: "Standing cable curl for consistent biceps resistance."
  },
  {
    name: "Decline Sit-Up",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Abs", impact: 0.85 },
      { muscle: "Lower Abs", impact: 0.5 }
    ],
    equipment: "Machine",
    description: "Sit-ups on a decline bench for higher abs resistance."
  },
  {
    name: "Weighted Russian Twist",
    muscleGroup: "Core",
    musclesHit: [
      { muscle: "Obliques", impact: 0.9 },
      { muscle: "Abs", impact: 0.45 }
    ],
    equipment: "Dumbbell",
    description: "Torso rotation holding a weight for oblique engagement."
  },
  {
    name: "Sled Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.8 },
      { muscle: "Lats", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Attach to a sled and row while walking backward."
  },
  {
    name: "Cable Pull-Through",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Glutes", impact: 0.85 },
      { muscle: "Hamstrings", impact: 0.5 }
    ],
    equipment: "Cables",
    description: "Hinge movement pulling a low cable between legs."
  },
  {
    name: "Seated Calf Raise",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Calves", impact: 0.9 }
    ],
    equipment: "Machine",
    description: "Machine exercise targeting the soleus."
  },
  {
    name: "Goblet Reverse Lunge",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.75 },
      { muscle: "Glutes", impact: 0.6 }
    ],
    equipment: "Kettlebell",
    description: "Hold kettlebell at chest and step back into a lunge."
  },
  {
    name: "Pendlay Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Upper Back", impact: 0.85 },
      { muscle: "Lats", impact: 0.6 },
      { muscle: "Lower Back", impact: 0.35 }
    ],
    equipment: "Barbell",
    description: "Explosive row from a dead stop on the floor each rep."
  },
  {
    name: "Weighted Pull-Up",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.95 },
      { muscle: "Biceps", impact: 0.5 }
    ],
    equipment: "Bodyweight",
    description: "Pull-up performed with additional external weight."
  },
  {
    name: "Machine Pec Deck Rear Delt",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Rear Delts", impact: 0.85 },
      { muscle: "Upper Back", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "Use pec deck in reverse to perform a rear delt fly."
  },
  {
    name: "Cable Single-Arm Lateral Raise",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Side Delts", impact: 0.85 },
      { muscle: "Front Delts", impact: 0.35 }
    ],
    equipment: "Cables",
    description: "Using a single low cable, raise arm laterally."
  },
  {
    name: "Machine Assisted Pull-Up",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.75 },
      { muscle: "Biceps", impact: 0.45 }
    ],
    equipment: "Machine",
    description: "Machine-assisted pull-ups to build strength."
  },
  {
    name: "Cable Single-Leg Kickback",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Glutes", impact: 0.85 }
    ],
    equipment: "Cables",
    description: "Extend leg backward against cable to isolate glute."
  },
  {
    name: "Dumbbell Reverse Fly (Incline Bench)",
    muscleGroup: "Shoulders",
    musclesHit: [
      { muscle: "Rear Delts", impact: 0.85 },
      { muscle: "Upper Back", impact: 0.45 }
    ],
    equipment: "Dumbbell",
    description: "Lie face down on incline bench and raise dumbbells."
  },
  {
    name: "Neutral-Grip Pull-Down",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.85 },
      { muscle: "Biceps", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "Lat pulldown using a neutral (parallel) handle."
  },
  {
    name: "Reverse Lunges (Barbell)",
    muscleGroup: "Legs",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.6 }
    ],
    equipment: "Barbell",
    description: "Step backward into a lunge with barbell on back."
  },
  {
    name: "Incline Hammer Strength Chest Press",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Upper Chest", impact: 0.85 },
      { muscle: "Triceps", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "Machine press on an incline plane for chest."
  },
  {
    name: "Cable Single-Arm Row",
    muscleGroup: "Back",
    musclesHit: [
      { muscle: "Lats", impact: 0.8 },
      { muscle: "Upper Back", impact: 0.45 }
    ],
    equipment: "Cables",
    description: "One-arm row on a cable pulley for long range."
  },
  {
    name: "Sled Drag",
    muscleGroup: "Full Body",
    musclesHit: [
      { muscle: "Quads", impact: 0.8 },
      { muscle: "Glutes", impact: 0.7 },
      { muscle: "Calves", impact: 0.4 }
    ],
    equipment: "Machine",
    description: "Drag a sled to develop lower-body strength."
  },
  {
    name: "EZ-Bar Preacher Curl",
    muscleGroup: "Arms",
    musclesHit: [
      { muscle: "Biceps", impact: 0.85 }
    ],
    equipment: "Barbell",
    description: "Biceps curls on a preacher bench using EZ-bar."
  },
  {
    name: "Weighted Dip (Machine or Belt)",
    muscleGroup: "Chest",
    musclesHit: [
      { muscle: "Middle Chest", impact: 0.8 },
      { muscle: "Triceps", impact: 0.45 }
    ],
    equipment: "Bodyweight",
    description: "Add external weight to parallel bar dips."
  }
];

const seedData= async()=>{
    try{
        await Exercise.deleteMany();
        await Exercise.insertMany(exercises);
        console.log('Seeded Successfully');
        process.exit();
    }   catch(error){
        console.log('!!SEED FAILED!! ERROR:', error);
        process.exit(1);
    }
};

seedData();