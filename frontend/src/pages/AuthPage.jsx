import { useState } from "react";
import { FaHeart, FaUserPlus } from "react-icons/fa";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>

      <div className="relative w-full max-w-md bg-white/20 shadow-2xl 
                      rounded-xl p-8 border border-white/30 
                      hover:backdrop-blur-xl floating">

        <h2 className="text-center text-4xl font-extrabold text-white mb-6 flex items-center justify-center gap-2">
          {isLogin ? <FaHeart /> : <FaUserPlus />}
          {isLogin ? "Sign in to SmashMeMaybe" : "Join SmashMeMaybe"}
        </h2>

        <div className="bg-white rounded-lg p-6 shadow-md">
          {isLogin ? <LoginForm /> : <SignUpForm />}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "New to SmashMeMaybe?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-2 px-4 py-2 text-white bg-gradient-to-r 
                        from-red-500 to-pink-500 rounded-full shadow-lg 
                        hover:scale-105 transition-transform cursor-pointer"
            >
              {isLogin ? "Create a new account" : "Sign in to your account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
