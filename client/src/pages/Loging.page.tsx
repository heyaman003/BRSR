import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectAuthError } from '@/features/auth/authSelectors';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Leaf, Recycle, Sun, Wind } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import type { AppDispatch } from '@/store/store.ts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface LoginFormProps {
  onLogin: (companyId: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        onLogin(resultAction.payload.data.companyId);
      } else {
        console.error("Login failed:", resultAction.payload);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen overflow-x-hidden">
      {/* Left Panel with Sustainability Animation */}
      <motion.div
        className="hidden lg:flex bg-[#166534] items-center justify-center p-8 relative overflow-hidden"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {/* Animated Nature Elements */}
        <motion.div
          className="absolute top-20 left-20 text-green-100/20"
          variants={floatingVariants}
          animate="float"
        >
          <Leaf size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-20 text-green-100/20"
          variants={floatingVariants}
          animate="float"
        >
          <Recycle size={40} />
        </motion.div>

        {/* Main Logo with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={logo} alt="Kalolwala Logo" className="w-[400px] relative z-10" />
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute bottom-10 left-1/4 text-green-100/30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        >
          <Wind size={50} />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-40 text-green-100/30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        >
          <Sun size={60} />
        </motion.div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div
        className="flex items-center justify-center p-8 relative "
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
         
        <motion.div
          className="w-full max-w-[400px] space-y-6 backdrop-blur-sm rounded-lg p-8 shadow-xl bg-white/95"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          
          <motion.div className='pb-4' variants={itemVariants}>
            <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              {/* <Droplets className="text-blue-500" /> */}
              Sustainable BRSR
              <Leaf className="text-green-500 text-3xl font-bold w-[40px] h-[40px]" />
            </h1>
          </motion.div>

          {error && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            variants={containerVariants}
          >
            {/* Email Input with Animation */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-[18px] w-[18px]" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </motion.div>

            {/* Password Input with Animation */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-[18px] w-[18px]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
            </motion.div>

            {/* Animated Submit Button */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
                // whileHover={{ scale: 1.02 }}
                // whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ♻️
                  </motion.span>
                ) : (
                  "Login"
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Sustainability Watermark */}
         
        </motion.div>
      </motion.div>
    </div>
  );
}