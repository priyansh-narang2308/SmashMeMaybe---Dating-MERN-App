import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useAuthStore();

  return (
    <form
      className='space-y-6'
      onSubmit={(e) => {
        e.preventDefault();
        login({ email, password });
      }}
    >
      <div>
        <label htmlFor='email' className='block text-lg font-semibold text-gray-800'>
          Email Address
        </label>
        <div className='mt-1 relative flex items-center border border-gray-300 rounded-lg shadow-sm bg-white'>
          <FaEnvelope className='text-gray-500 text-xl ml-4' />
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='appearance-none block w-full px-4 py-3 border-none rounded-r-lg placeholder-gray-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-lg font-medium'
          />
        </div>
      </div>

      <div>
        <label htmlFor='password' className='block text-lg font-semibold text-gray-800'>
          Password
        </label>
        <div className='mt-1 relative flex items-center border border-gray-300 rounded-lg shadow-sm bg-white'>
          <FaLock className='text-gray-500 text-xl ml-4' />
          <input
            id='password'
            name='password'
            type={showPassword ? "text" : "password"}
            autoComplete='current-password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='appearance-none block w-full px-4 py-3 border-none rounded-r-lg placeholder-gray-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-lg font-medium'
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4 text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={20} className="cursor-pointer" /> : <FaEye className="cursor-pointer" size={20} />}
          </button>
        </div>
      </div>

      <button
        type='submit'
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 cursor-pointer"}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin mr-2 text-xl" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
