import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Search, Dumbbell } from "lucide-react";

const WorkoutSession = ({ activeWorkout, setActiveWorkout }) => {
  const [exerciseLibrary, setExerciseLibrary] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);

  // 1. Fetch the 100+ exercises library once
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/exercises");
        setExerciseLibrary(data);
      } catch (error) {
        console.error("Library fetch failed", error);
      }
    };
    fetchLibrary();
  }, []);

  // 2. Live Search Logic (3-character trigger)
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = exerciseLibrary.filter((ex) =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExercises(results);
    } else {
      setFilteredExercises([]);
    }
  }, [searchTerm, exerciseLibrary]);

  // 3. Handshake with the backend to add exercise
    const handleAddExercise = async (exerciseId) => {
        try {
            // 1. Get the raw string from localStorage
            const storedInfo = localStorage.getItem("userInfo");
            if (!storedInfo) return console.error("No user info found");

            const userInfo = JSON.parse(storedInfo);
            
            // 2. DRILL DOWN: Based on your previous logs, your token is 
            // likely directly on userInfo or inside userInfo.token
            const token = userInfo?.token || userInfo?.data?.token;

            if (!token || token === "undefined") {
            console.error("Token is invalid or undefined");
            return;
            }

            const config = { headers: { Authorization: `Bearer ${token}` } };

            const { data } = await axios.put(
            `http://localhost:5000/api/workouts/${activeWorkout._id}/add`,
            { exerciseId },
            config
            );

            setActiveWorkout(data);
            setSearchTerm("");
        } catch (error) {
            // Look at the console to see the real error message from the backend
            console.error("Add Exercise Failed:", error.response?.data?.message || error.message);
        }
    };

  return (
    <div className="animate-in fade-in duration-500">
        {/* Header Info */}
        <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-100 uppercase tracking-tighter">
            Live Training Session
        </h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            Session ID: {activeWorkout._id.slice(-6)}
        </p>
        </div>

        {/* THE GRID: 1 column on mobile, 2 columns on medium screens+ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Search (Spans 5/12) */}
        <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800 p-6 rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/5">
            <div className="flex items-center gap-2 mb-6">
                <Search size={20} className="text-emerald-400" />
                <h2 className="text-lg font-black text-slate-200 uppercase tracking-tighter">Add Exercise</h2>
            </div>
            
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type 3+ letters..."
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
            />

            {/* Search Results */}
            {filteredExercises.length > 0 && (
                <div className="mt-4 max-h-[400px] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md divide-y divide-slate-800">
                {filteredExercises.map((ex) => (
                    <button
                    key={ex._id}
                    onClick={() => handleAddExercise(ex._id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-emerald-500 hover:text-slate-900 transition-all group"
                    >
                    <div className="text-left">
                        <p className="font-bold">{ex.name}</p>
                        <p className="text-[10px] uppercase font-black opacity-60 tracking-widest">{ex.muscleGroup}</p>
                    </div>
                    <PlusCircle size={20} className="opacity-40 group-hover:opacity-100" />
                    </button>
                ))}
                </div>
            )}
            </div>
        </div>

        {/* RIGHT COLUMN: Current Session List (Spans 7/12) */}
        <div className="lg:col-span-7">
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Exercises</h3>
                <span className="bg-slate-700 text-slate-300 text-[10px] px-3 py-1 rounded-full font-bold">
                {activeWorkout?.exercises?.length || 0} TOTAL
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {activeWorkout?.exercises?.length > 0 ? (
                activeWorkout.exercises.map((item, idx) => (
                    <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-700 flex justify-between items-center hover:border-emerald-500/40 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <Dumbbell size={24} />
                        </div>
                        <div>
                        <span className="font-black text-slate-100 uppercase tracking-tight text-lg">
                            {item.exerciseId?.name}
                        </span>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {item.exerciseId?.muscleGroup}
                        </p>
                        </div>
                    </div>
                    
                    {/* We'll turn this into the set logger tomorrow */}
                    <div className="text-right">
                        <button className="text-xs bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-900 transition-colors">
                        Log Set
                        </button>
                    </div>
                    </div>
                ))
                ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-700">
                    <Dumbbell size={48} className="mb-4 opacity-20" />
                    <p className="font-black uppercase tracking-widest text-sm opacity-20">No exercises added</p>
                </div>
                )}
            </div>
            </div>
        </div>

        </div>
    </div>
    );
};

export default WorkoutSession;