import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";
import {
  User,
  Calendar,
  Heart,
  ImagePlus,
  Upload,
  Save,
  Sparkles,
} from "lucide-react";

const futuristicOption =
  "cursor-pointer px-4 py-1.5 rounded-full text-sm transition-all duration-300 border border-pink-300 hover:shadow-xl hover:scale-105 font-semibold backdrop-blur-md bg-white/10 text-white";

const selectedOption =
  "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-lg scale-105 border-none";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [name, setName] = useState(authUser.name || "");
  const [bio, setBio] = useState(authUser.bio || "");
  const [age, setAge] = useState(authUser.age || "");
  const [gender, setGender] = useState(authUser.gender?.toLowerCase() || "");
  const [genderPreference, setGenderPreference] = useState(
    authUser.genderPreference?.toLowerCase() || ""
  );
  const [image, setImage] = useState(authUser.image || null);
  const fileInputRef = useRef(null);
  const { loading, updateProfile } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      bio,
      age,
      gender: gender.toLowerCase(),
      genderPreference: genderPreference.toLowerCase(),
      image,
    });
    toast.success("Profile updated 💖");
  };

  const handleImageChange = (e) => {
    // base 64 image
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        toast("Image preview ready 🚀", { icon: "📸" });
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(image);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#110f0f] via-[#580768] to-[#8b098b] text-white'>
      <Header />
      <div className='flex flex-col items-center py-12 px-4'>
        <div className='w-full max-w-xl bg-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 space-y-6'>
          <h2 className='text-3xl font-bold text-center flex items-center justify-center gap-2'>
            <Sparkles className='text-pink-400' /> Edit Dating Profile
          </h2>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name */}
            <div className='relative'>
              <User className='absolute top-3 left-3 text-pink-300' />
              <input
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your Name'
                className='w-full pl-10 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-white/70'
              />
            </div>

            {/* Age */}
            <div className='relative'>
              <Calendar className='absolute top-3 left-3 text-pink-300' />
              <input
                type='number'
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='Your Age'
                className='w-full pl-10 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-white/70'
              />
            </div>

            {/* Gender */}
            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Heart className='text-pink-400' /> Gender
              </label>
              <div className='flex gap-3'>
                {["male", "female", "other"].map((option) => (
                  <div
                    key={option}
                    className={`${futuristicOption} ${gender === option ? selectedOption : ""
                      }`}
                    onClick={() => setGender(option)}
                  >
                    {capitalize(option)}
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Preference */}
            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Heart className='text-fuchsia-400' /> Looking For
              </label>
              <div className='flex gap-3'>
                {["male", "female", "both"].map((option) => (
                  <div
                    key={option}
                    className={`${futuristicOption} ${genderPreference === option ? selectedOption : ""
                      }`}
                    onClick={() => setGenderPreference(option)}
                  >
                    {capitalize(option)}
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className='relative'>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='Write a short and sweet bio...'
                className='w-full pl-4 pr-2 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-white/70 resize-none'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <ImagePlus className='text-pink-300' /> Profile Picture
              </label>
              <div className='flex items-center gap-4 flex-wrap'>
                <button
                  type='button'
                  onClick={() => fileInputRef.current.click()}
                  className='flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-sm font-medium shadow-md transition cursor-pointer'
                >
                  <Upload className='w-4 h-4' /> Upload
                </button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
                />

                {image && (
                  <div className='relative'>
                    <img
                      src={image}
                      alt='preview'
                      className='h-24 w-24 sm:h-32 sm:w-32 rounded-2xl object-cover border-4 border-pink-400 shadow-xl transition-all duration-300 hover:scale-105'
                    />
                    <button
                      type='button'
                      onClick={() => setImage(null)}
                      className='absolute -top-2 -right-2 bg-pink-600 text-white rounded-full p-1 hover:bg-pink-700 shadow-lg transition'
                      title='Remove'
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>


            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:brightness-110 rounded-xl cursor-pointer text-white font-semibold text-lg tracking-wide shadow-xl transition-all'
            >
              <Save className='w-5 h-5 cursor-pointer' />
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
