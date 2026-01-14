// src/components/dashboard/WorkoutManager.jsx
import React from 'react';
import { Play, Clock, Dumbbell } from 'lucide-react';

const WorkoutManager = ({ activeWorkout, onStart, setActiveView }) => {
  if (!activeWorkout) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl text-center border-dashed mt-8">
        <p className="text-slate-500 font-medium mb-4">No session in progress</p>
        <button 
          onClick={onStart}
          className="text-emerald-400 hover:text-emerald-300 font-bold text-sm uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors"
        >
          <Play size={16} fill="currentColor" /> Quick Start
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/30 p-6 rounded-3xl animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="bg-emerald-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
            Ongoing Session
          </span>
          <h2 className="text-xl font-bold mt-2 text-slate-100">
            {activeWorkout.name || "Current Workout"}
          </h2>
        </div>
        <div className="flex gap-4">
            <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Exercises</p>
                <p className="text-emerald-400 font-mono font-bold">{activeWorkout.exercises?.length || 0}</p>
            </div>
        </div>
      </div>

      <button 
        onClick={() => setActiveView('Session')}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
      >
        Open Workout Tracker
      </button>
    </div>
  );
};

export default WorkoutManager;