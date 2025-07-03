import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleForm = (e) => {
    e.preventDefault();
    setShowSignup(!showSignup);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#ece2f5] to-[#fcfbfd] flex flex-col items-center justify-center relative overflow-hidden font-['Poppins']">
      {/* Background Icon */}
      <div className="fixed top-0 left-0 w-full h-full bg-[url('/Bg-icon.svg')] bg-cover bg-center opacity-60 pointer-events-none z-0"></div>
      
      {/* Navigation */}
      <nav className="flex justify-between items-center w-full px-12 py-4 absolute top-0 left-0 z-10">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-white text-2xl font-semibold bg-[#1A237E] px-4 py-2 rounded-[20px] no-underline">
            <img src="/Moon.svg" alt="Moon" className="w-6 h-6" />
            DeepShield
          </Link>
        </div>
        <div className="flex gap-12">
          <Link to="/" className="text-[#212121] font-medium text-xl no-underline hover:text-[#00ACC1] transition-colors">Home</Link>
          <Link to="/detect" className="text-[#212121] font-medium text-xl no-underline hover:text-[#00ACC1] transition-colors">Detect</Link>
          <Link to="/features" className="text-[#212121] font-medium text-xl no-underline hover:text-[#00ACC1] transition-colors">Features</Link>
        </div>
        <div>
          <img src="/Brain.svg" alt="Brain Icon" className="w-8 h-8" />
        </div>
      </nav>

      {/* Back Button */}
      <div className="absolute top-24 left-12 z-10">
        <Link to="/" className="text-black no-underline text-lg font-medium flex items-center gap-2 hover:text-[#00ACC1] transition-colors">
          ← Back
        </Link>
      </div>

      {/* Login Card */}
      <div className="bg-gradient-to-br from-[#7a87f9] to-[#fe7efe] rounded-[20px] p-10 w-full max-w-[480px] text-center relative z-10 shadow-lg">
        <div className="mb-6">
          <img src="/profile-icon.svg" alt="User Icon" className="w-16 h-16 mx-auto" />
        </div>
        
        <div className={`bg-[#F5F7FA] rounded-md p-8 ${showSignup ? 'block' : 'block'}`}>
          <div className={`${showSignup ? 'hidden' : 'block'}`}>
            <header className="text-3xl font-semibold text-[#212121] text-center mb-6">Login</header>
            <form action="#">
              <div className="relative h-[50px] w-full mb-4">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="h-full w-full border border-[#CACACA] rounded-md outline-none px-4 text-base focus:border-[#1A237E]"
                />
              </div>

              <div className="relative h-[50px] w-full mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-full w-full border border-[#CACACA] rounded-md outline-none px-4 text-base focus:border-[#1A237E]"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-[#757575] cursor-pointer bg-none border-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="text-center mt-3">
                <a href="#" className="text-[#00ACC1] no-underline text-sm hover:underline">Forgot password?</a>
              </div>

              <div className="h-[50px] w-full mt-4">
                <button type="submit" className="text-white bg-[#00ACC1] h-full w-full border-none text-base font-normal rounded-md cursor-pointer transition-all hover:bg-[#F9A825] hover:text-[#212121]">
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <span className="text-sm text-[#212121]">
                Don't have an account? 
                <a href="#" className="text-[#00ACC1] no-underline ml-1 hover:underline" onClick={toggleForm}>
                  Signup
                </a>
              </span>
            </div>
          </div>

          <div className={`${showSignup ? 'block' : 'hidden'}`}>
            <header className="text-3xl font-semibold text-[#212121] text-center mb-6">Signup</header>
            <form action="#">
              <div className="relative h-[50px] w-full mb-4">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="h-full w-full border border-[#CACACA] rounded-md outline-none px-4 text-base focus:border-[#1A237E]"
                />
              </div>

              <div className="relative h-[50px] w-full mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="h-full w-full border border-[#CACACA] rounded-md outline-none px-4 text-base focus:border-[#1A237E]"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-[#757575] cursor-pointer bg-none border-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="relative h-[50px] w-full mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="h-full w-full border border-[#CACACA] rounded-md outline-none px-4 text-base focus:border-[#1A237E]"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-[#757575] cursor-pointer bg-none border-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="h-[50px] w-full mt-4">
                <button type="submit" className="text-white bg-[#00ACC1] h-full w-full border-none text-base font-normal rounded-md cursor-pointer transition-all hover:bg-[#F9A825] hover:text-[#212121]">
                  Signup
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <span className="text-sm text-[#212121]">
                Already have an account? 
                <a href="#" className="text-[#00ACC1] no-underline ml-1 hover:underline" onClick={toggleForm}>
                  Login
                </a>
              </span>
            </div>
          </div>

          <div className="relative h-px w-full my-9 bg-[#d4d4d4]">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F5F7FA] text-[#757575] px-4">Or</span>
          </div>

          <div className="mb-4">
            <a href="#" className="flex items-center justify-center py-3 rounded-md text-base font-medium text-white no-underline bg-[#4267b2] hover:bg-[#00ACC1] transition-colors">
              <img src="/social/facebook.svg" alt="Facebook" className="w-5 h-5 mr-3 object-contain" />
              Login with Facebook
            </a>
          </div>
          <div>
            <a href="#" className="flex items-center justify-center py-3 rounded-md text-base font-medium text-black no-underline bg-[#1A237E] border border-[#CACACA] hover:bg-[#00ACC1] transition-colors">
              <img src="/google.svg" alt="Google" className="w-5 h-5 mr-3 object-contain" />
              Login with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

