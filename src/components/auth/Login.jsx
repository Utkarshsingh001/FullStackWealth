import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Phone, ArrowRight, Wallet } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!showOTP) {
      // Simulate OTP send
      setTimeout(() => {
        setShowOTP(true);
        setIsLoading(false);
        // Focus the first OTP input after showing
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }, 1000);
      return;
    }

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      navigate('/dashboard');
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate Google Sign In
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      navigate('/dashboard');
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    
    pastedData.forEach((value, index) => {
      if (index < 6 && /^\d$/.test(value)) {
        newOtp[index] = value;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-lg">
                <Wallet className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Welcome to Wealthi<span className="text-blue-600 dark:text-blue-400">Hq</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!showOTP ? (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg 
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Enter OTP
                </label>
                <div className="flex gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center border border-slate-300 dark:border-slate-600 rounded-lg 
                        bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xl
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition duration-200"
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Didn't receive code? <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">Resend</button>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {showOTP ? 'Verify OTP' : 'Get OTP'}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="mt-4 w-full bg-white dark:bg-slate-700 text-slate-700 dark:text-white py-2.5 px-4 rounded-lg font-medium
                border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition duration-200 flex items-center justify-center gap-2"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;