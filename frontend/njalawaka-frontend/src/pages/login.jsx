import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://njalawaka-agri-and-general-dealers.onrender.com/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if(res.status === 200){
      localStorage.setItem("admin","true");
      navigate("/admin");
    }else{
      alert("Invalid login");
    }
  };

  return(
    <div className="min-h-screen flex font-sans">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center text-white overflow-hidden">

        {/* Background Image */}
        <img
          src="/farm.jpg"
          alt="farm"
          className="absolute w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-black/70"></div>

        {/* Content */}
        <div className="relative z-10 px-12 text-center animate-fadeIn">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Welcome to <br /> Njalawaka 🌾
          </h1>

          <p className="text-lg opacity-90">
            Smart farming starts here. Manage products, equipment, and livestock with ease.
          </p>
        </div>
      </div>


      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <form
          onSubmit={handleLogin}
          className="backdrop-blur-xl bg-white/70 shadow-2xl p-10 rounded-2xl w-full max-w-md border border-white/30 animate-slideUp"
        >

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-6">
            Login to your admin account
          </p>

          {/* Username */}
          <div className="flex items-center border rounded-lg mb-4 px-3 focus-within:ring-2 focus-within:ring-green-600">
            <User className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
              className="w-full p-3 outline-none bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg mb-6 px-3 focus-within:ring-2 focus-within:ring-green-600">
            <Lock className="text-gray-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="w-full p-3 outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition transform hover:scale-105"
          >
            Login
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={()=>navigate("/register")}
              className="text-green-700 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>

        </form>

      </div>

    </div>
  )
}

export default Login;