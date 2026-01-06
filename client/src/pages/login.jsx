import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData]= useState({
        username: '',
        email:'',
        password:''
    });

    const onChange=(e)=>{
        if (error) setError("");
        setFormData({...formData, [e.target.id]: e.target.value})
    };
    
    const handleSubmit= async (e) => {
        e.preventDefault();
        const url= isLogin
            ? 'http://localhost:5000/api/users/auth/login'
            : 'http://localhost:5000/api/users/auth/register';
        try{
            const response= await axios.post(url, formData);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            console.log('Success! Logged in as: ',response.data.data.username);
        } catch(error) {
            const serverMessage = error.response?.data?.message;
            setError(serverMessage || 'Server is not responding. Check your connection.');
        }
    };

    return(
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
                <h2 className="text-3xl font-black text-emerald-400 mb-6 text-center italic">GYM TRACKER</h2>
                
                <div className="relative flex bg-slate-700 rounded-lg p-1 mb-8 w-full">
                    {/* The Animated Background Slider */}
                    <div 
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emerald-500 rounded-md transition-all duration-300 ease-in-out ${
                        isLogin ? "left-1" : "left-[50%]"
                        }`}
                    ></div>

                    {/* Login Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(true);
                            setError("");
                        }}
                        className={`relative z-10 w-1/2 py-2 text-sm font-bold transition-colors duration-300 ${
                        isLogin ? "text-slate-900" : "text-slate-400"
                        }`}
                    >
                        LOGIN
                    </button>

                    {/* Register Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(false);
                            setError("");
                        }}
                        className={`relative z-10 w-1/2 py-2 text-sm font-bold transition-colors duration-300 ${
                        !isLogin ? "text-slate-900" : "text-slate-400"
                        }`}
                    >
                        REGISTER
                    </button>
                </div>

                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                    <div className="transition-all duration-300">
                        <label className="block text-slate-400 mb-2">Username</label>
                        <input 
                        type="text" 
                        id="username"
                        placeholder="Choose a username"
                        className="w-full bg-slate-700 border border-slate-600 rounded p-3 text-white focus:outline-none focus:border-emerald-400"
                        onChange={onChange}
                        required
                        />
                    </div>
                    )}
                     
                    <div>
                    <label className="block text-slate-400 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="your-email@example.com"
                        className="w-full bg-slate-700 border border-slate-600 rounded p-3 text-white focus:outline-none focus:border-emerald-400"
                        onChange={onChange}
                        required
                    />
                    </div>
                    
                    <div>
                    <label className="block text-slate-400 mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-700 border border-slate-600 rounded p-3 text-white focus:outline-none focus:border-emerald-400"
                        onChange={onChange}
                        required
                    />
                    </div>

                    {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md text-center animate-shake">
                        {error}
                    </div>
                    )}
                    
                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 rounded transition duration-200 mt-4">
                    {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;