import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import toast from "react-hot-toast";
import { Mail, Lock, User } from "lucide-react";

function Login({ setUser, setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setUser(res.data.user);
      toast.success("Welcome back to ZynChat!");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="auth-bg" />
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center min-h-screen p-4"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800/50 shadow-2xl rounded-3xl p-8 md:p-10"
        >
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
            className="text-center mb-10"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-whatsapp-green to-emerald-600 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-2xl border-4 border-white/20">
              <span className="text-3xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-lg">Z</span>
            </div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-2xl"
            >
              ZynChat
            </motion.h1>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-300 font-medium"
            >
              Welcome Back
            </motion.p>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-whatsapp-green transition-colors" />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="pl-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-whatsapp-green group"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-whatsapp-green transition-colors" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 bg-slate-800/50 border-slate-700 hover:border-slate-600 focus:border-whatsapp-green group"
              />
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleLogin} 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-whatsapp-green to-emerald-600 hover:from-emerald-600 hover:to-whatsapp-green shadow-xl hover:shadow-2xl transform transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : "Sign In"}
              </Button>
            </motion.div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 text-slate-400 text-sm"
          >
            Don't have an account?{" "}
            <button 
              onClick={() => setIsLogin(false)} 
              className="text-whatsapp-green hover:text-emerald-400 font-semibold transition-all duration-300 hover:underline"
            >
              Create one now
            </button>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;

