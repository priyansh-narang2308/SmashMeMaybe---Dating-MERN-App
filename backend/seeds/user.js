import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const maleNames = [
    "Aarav",
    "Vivaan",
    "Aditya",
    "Vihaan",
    "Arjun",
    "Sai",
    "Krishna",
    "Rohan",
    "Karan"
];

const femaleNames = [
    "Aanya",
    "Ananya",
    "Diya",
    "Ishita",
    "Kavya",
    "Meera",
    "Priya",
    "Saanvi",
    "Riya",
    "Naina",
    "Lavanya",
    "Tanya"
];


const genderPreferences = ["male", "female", "both"];

const bioDescriptors = [
    "Chai-fueled coder",
    "Part-time philosopher, full-time procrastinator",
    "Excel sheet ninja",
    "Zoom meeting survivor",
    "Swiggy Gold member",
    "Serial '5 more minutes' snoozer",
    "Bullet point enthusiast",
    "PPT presentation perfectionist",
    "Breakout room escape artist",
    "Keyboard warrior (mostly emails)",
    "Weekend Netflix researcher",
    "Google Docs loyalist",
    "Mic muted speaker",
    "Professional multitasker (also cooks Maggi while coding)",
    "Spice level: Extra masala",
    "Inbox zero dreamer",
    "Tea breaks > Coffee breaks",
    "Ctrl+C, Ctrl+V specialist",
    "Loves deadlines (especially the whooshing sound they make)",
    "Catchphrase: Just give me 2 minutes"
];


const generateBio = () => {
    const descriptors = bioDescriptors.sort(() => 0.5 - Math.random()).slice(0, 3);
    return descriptors.join(" | ");
};

const generateRandomUser = (gender, index) => {
    const names = gender === "male" ? maleNames : femaleNames;
    const name = names[index];
    const age = Math.floor(Math.random() * (45 - 21 + 1) + 21);
    return {
        name,
        email: `${name.toLowerCase()}${age}@example.com`,
        password: bcrypt.hashSync("password123", 10),
        age,
        gender,
        genderPreference: genderPreferences[Math.floor(Math.random() * genderPreferences.length)],
        bio: generateBio(),
        image: `/${gender}/${index + 1}.jpg`,
    };
};

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await User.deleteMany({});

        const maleUsers = maleNames.map((_, i) => generateRandomUser("male", i));
        const femaleUsers = femaleNames.map((_, i) => generateRandomUser("female", i));

        const allUsers = [...maleUsers, ...femaleUsers];

        await User.insertMany(allUsers);

        console.log("Database seeded successfully with users having concise bios");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.disconnect();
    }
};

seedUsers();