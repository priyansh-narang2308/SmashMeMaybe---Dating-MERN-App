import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaBirthdayCake, FaHeart, FaSpinner } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  // const loading = false
  const { signup, loading } = useAuthStore();


  return (
    <form
      className="space-y-6 overflow-y-auto max-h-[60vh] p-4"
      onSubmit={(e) => {
        e.preventDefault();
        signup({ name, email, gender, password, genderPreference, age });
      }} >
      {/* NAME */}
      <div className="relative">
        <FaUser className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-10 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
      </div>

      {/* EMAIL */}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-10 pr-10 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="relative">
        <FaBirthdayCake className="absolute left-3 top-3 text-gray-500" />
        <input
          type="number"
          placeholder="Age"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="pl-10 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Your Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>



      <div>
        <label className="block text-sm font-medium  text-gray-700">Preferred Gender</label>
        <div className="flex gap-4">
          {[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Both", value: "both" },
          ].map((option) => (
            <label key={option.value} className="flex items-center text-black gap-2">
              <input
                type="radio"
                value={option.value}
                checked={genderPreference === option.value}
                onChange={(e) => setGenderPreference(e.target.value)}
                className="text-pink-600  focus:ring-pink-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 cursor-pointer"}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin mr-2 text-xl" />
            Signing up...
          </>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
