import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';
import prismLogo from '../assets/dark-side-logo.svg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    toast.success('Login successful!');
    navigate('/onboarding');
  };

  const handleGoogleSignIn = () => {
    toast.info('Google Sign In would be implemented here');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex bg-[#0e0b16] text-white">
      <div className="w-full flex">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col items-center">
              <img src={prismLogo} alt="Prism Logo" className="h-16 w-16 mb-4" />
              <h1 className="text-4xl font-bold">Get Started</h1>
              <p className="text-gray-400 mt-2">Log in to create and remix music with AI-powered tools.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full px-4 py-3 bg-[#1a1625] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41FDFE] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="mt-1 w-full px-4 py-3 bg-[#1a1625] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41FDFE] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-600 bg-[#1a1625] text-[#41FDFE] focus:ring-[#41FDFE] focus:ring-offset-0"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-300">Remember me</label>
                </div>
                <button type="button" className="text-sm text-[#41FDFE] hover:text-[#41FDFE]/80 transition-colors">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#41FDFE] text-black font-medium rounded-lg hover:bg-[#41FDFE]/90 transition-all duration-200"
              >
                Log in
              </button>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 flex justify-center items-center gap-2 border border-gray-600 rounded-lg hover:bg-[#1a1625] transition-all duration-200"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>
            </form>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-[#41FDFE] hover:text-[#41FDFE]/80 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-[#0e0b16]">
          <div className="h-full w-full flex items-center justify-center p-8">
            <img
              src="/ai-musician.png"
              alt="AI Musician"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
