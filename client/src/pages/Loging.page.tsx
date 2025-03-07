import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectAuthError } from '@/features/auth/authSelectors';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import type { AppDispatch } from '@/store/store.ts';

interface LoginFormProps {
  onLogin: () => void; // Define handleLogin as a function with no arguments and no return value
}

export default function LoginForm({onLogin}:LoginFormProps) {
  const dispatch = useDispatch<AppDispatch>(); // Properly typed dispatch
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const resultAction = await dispatch(loginUser({ email, password })); // Wait for dispatch
  
      if (loginUser.fulfilled.match(resultAction)) { 
        onLogin(); // Call onLogin only if login is successful
      } else {
        console.error("Login failed:", resultAction.payload);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  

  return (
    <div className="grid lg:grid-cols-2 min-h-screen ">
      <div className="hidden lg:flex bg-[#166534] items-center justify-center p-8">
        <img src={logo} alt="Kalolwala Logo" className="w-[400px]" />
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-[400px] space-y-6 backdrop-blur-sm rounded-lg p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-center">BRSR</h1>

          {/* {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
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
            </div>

            <div className="space-y-2">
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
            </div>

            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
