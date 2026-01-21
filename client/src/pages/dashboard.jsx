import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { 
  Menu,
  X,
  ChevronDown,
  Dumbbell, 
  History, 
  User, 
  Settings, 
  LogOut, 
  PlusCircle 
} from 'lucide-react';
import WorkoutManager from "../components/dashboard/WorkoutManager";
import axios from 'axios';
import WorkoutSession from "../components/dashboard/WorkoutSession";


const Dashboard= () =>{

  const navigate=useNavigate();

  const [isSidebarOpen, setIsSidebarOpen]=useState(false);
  const [isProfileOpen, setIsProfileOpen]=useState(false);
  const [activeView, setActiveView]=useState('Overview');
  const [activeWorkout, setActiveWorkout]=useState(null);

  const user= JSON.parse(localStorage.getItem('userInfo'))?.data;
  
  useEffect(() => {
    const checkOngoing = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token || userInfo?.data?.token;
        
        if (!token) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5000/api/workouts/ongoing', config);
        
        // If the API returns a workout object (not null)
        if (data && data._id) {
          console.log("Found ongoing workout:", data._id);
          setActiveWorkout(data);
          setActiveView('Session'); // THIS IS KEY: Force the view to 'Session' on load
        }
      } catch (error) {
        console.error("Session sync failed:", error.response?.data?.message);
      }
    };
    checkOngoing();
  }, []);

  const handleStartWorkout = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token || userInfo?.data?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const { data } = await axios.post('http://localhost:5000/api/workouts', {}, config);
      
      setActiveWorkout(data);
      setActiveView('Session'); 
    } catch (error) {
      // IF THE BACKEND SAYS 400 (ALREADY ACTIVE), FETCH THE ONGOING ONE INSTEAD
      if (error.response?.status === 400) {
        console.log("Workout already exists, fetching ongoing session...");
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token || userInfo?.data?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const { data } = await axios.get('http://localhost:5000/api/workouts/ongoing', config);
        setActiveWorkout(data);
        setActiveView('Session');
      } else {
        console.error(error.response?.data?.message || "Start failed");
      }
    }
  };


  const handleLogout = () => {
      localStorage.removeItem('userInfo');
      navigate('/login');
      window.location.reload(); 
    };  
    
  return(
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
        {/* navbar */}
        <nav className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 md:px-8 fixed w-full top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="md:hidden p-1 hover:bg-slate-700 rounded text-slate-400"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-black text-emerald-400 italic tracking-tighter">GYM TRACKER</h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleStartWorkout}
              disabled={activeWorkout && activeView!=='Session'}
              className={
                `hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                activeWorkout 
                ? "bg-amber-500/10 text-amber-500 border border-amber-500/50 hover:bg-amber-500 hover:text-slate-900" 
                : "bg-emerald-500 text-slate-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              }`}
            >
              <PlusCircle size={16} />
              {activeWorkout ? 'Resume Session' : 'Start Workout'}
            </button>
          </div>


          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-700 rounded-lg transition-colors border border-transparent hover:border-slate-600"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                <div className="px-4 py-2 border-b border-slate-700 mb-1">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Signed in as</p>
                  <p className="text-sm font-bold text-emerald-400 truncate">{user?.username}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-700 text-sm transition-colors text-slate-300">
                  <User size={16} /> Edit Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-700 text-sm transition-colors text-slate-300">
                  <Settings size={16} /> Settings
                </button>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 text-red-400 text-sm font-bold transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </nav>
        
        
        <div className="flex pt-16 h-screen overflow-hidden">
          <aside className={`
            fixed md:relative z-40 w-64 bg-slate-800 h-[calc(100vh-64px)] border-r border-slate-700 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          `}>
            <div className="p-4 space-y-2">
              {[
                { icon: <PlusCircle size={20} />, label: 'Start Workout', view:'Overview' },
                { icon: <History size={20} />, label: 'History', view:'History'},
                { icon: <Dumbbell size={20} />, label: 'Exercises', view:'Exercises' },
              ].map((item) => (
                <button 
                key={item.label} 
                onClick={()=>setActiveView(item.view)}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 transition-all font-bold text-xs uppercase tracking-widest">
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-900">
            <div className="max-w-full mx-auto w-full">
              
              {activeView === 'Overview' && (
                <div className="animate-in fade-in duration-500">
                  <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
                  <p className="text-slate-400 text-sm mb-8">Welcome back, {user?.username}.</p>
                  
                  <WorkoutManager 
                    activeWorkout={activeWorkout} 
                    onStart={handleStartWorkout}
                    setActiveView={setActiveView} 
                  />
                  
                  <div className="h-64 border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center text-slate-700 font-bold uppercase tracking-widest">
                    Stats & Progress Charts
                  </div>
                </div>
              )}

              {activeView === 'Session' && (
                <WorkoutSession 
                  activeWorkout={activeWorkout} 
                  setActiveWorkout={setActiveWorkout} 
                />
              )}

              {activeView === 'Exercises' && <ExerciseLibrary />}
              
              {activeView === 'History' && <WorkoutHistory />}

            </div>
          </main>
        </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
    </div>
  );
}
export default Dashboard;
