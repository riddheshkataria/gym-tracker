import React, { useState } from "react";
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

const Dashboard= () =>{

  const navigate=useNavigate();

  const [isSidebarOpen, setIsSidebarOpen]=useState(false);
  const [isProfileOpen, setIsProfileOpen]=useState(false);
  
  const user= JSON.parse(localStorage.getItem('userInfo'))?.data;

  const handleLogout = () => {
      localStorage.removeItem('userInfo');
      navigate('/login');
      window.location.reload(); 
    };  
    
  return(
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
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
                { icon: <PlusCircle size={20} />, label: 'Start Workout' },
                { icon: <History size={20} />, label: 'History' },
                { icon: <Dumbbell size={20} />, label: 'Exercises' },
              ].map((item, idx) => (
                <button key={idx} className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 transition-all font-bold text-xs uppercase tracking-widest">
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-900">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-slate-100">Dashboard</h1>
                <p className="text-slate-400 text-sm">Welcome back to your training center.</p>
                
                <div className="mt-8 h-64 border-2 border-dashed border-slate-800 p-4 rounded-3xl flex items-center justify-center text-slate-700 font-bold uppercase tracking-widest">
                  Workout Stats Coming Soon
                </div>
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
