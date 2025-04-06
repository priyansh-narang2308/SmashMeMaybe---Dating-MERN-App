# 💘 SmashMeMaybe

![image](https://github.com/user-attachments/assets/1928828f-b011-4a82-996e-bedde1aa3cc9)

**SmashMeMaybe** is a real-time dating app built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** with **Socket.IO** integration for live messaging and instant match notifications. Think Tinder, but cooler, faster, and open-source 🔥

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 💬 Real-time 1-to-1 Messaging (Socket.IO)
- ❤️ Swipe Left/Right to Match
- 📸 Profile Picture Uploads (Multer)
- 📝 Custom Bios, Interests, and Preferences
- 🔔 Instant Notifications on Match
- 🌐 Location-Aware Matching *(Optional)*
- 🎨 Clean & Responsive UI (Light/Dark Mode Ready)

---

## 🛠️ Tech Stack

### Frontend (React)
- React.js
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS / Styled Components (choose one)
- React Context API (for global auth state)

### Backend (Node + Express)
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO Server
- Cloudinary (for image upload)
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- dotenv

---

## 📦 Installation & Setup

### ✅ Prerequisites
- Node.js & npm
- MongoDB (Local or Atlas)
- Git

---

### 📁 Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/SmashMeMaybe.git
cd SmashMeMaybe
```

---

### 🔧 Step 2: Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server` and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
```

Then start the backend server:

```bash
npm start
```

---

### 💻 Step 3: Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client` and add:

```env
REACT_APP_API_URL=http://localhost:5000
```

Then run the frontend:

```bash
npm start
```

---

## 🔌 Socket.IO Setup

Socket.IO is used for real-time features like messaging and live match notifications. The client connects to the server automatically once both are running.

**Backend:** Socket.IO server runs alongside Express  
**Frontend:** Socket.IO client listens for events and emits messages to the server

No extra setup needed – just run both servers.

---

## 🧲 Test Users (Optional)

Create two accounts, log in from different browsers or devices, and test:
- Swiping/matching between them
- Real-time chatting
- Match notifications 🔔

---

## 📂 Folder Structure

```bash
SmashMeMaybe/
├── client/             # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── utils/
│       └── App.js
├── server/             # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   ├── middleware/
│   └── index.js
├── README.md
```

---

## 📸 Screenshots

> Add your screenshots here (e.g. login page, swiping, chat interface)  
> Use `![Alt text](path/to/image.png)` to embed

---

## 📜 API Endpoints

### Auth
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user

### User
- `GET /api/users/:id` – Get user profile
- `PUT /api/users/:id` – Update user details
- `GET /api/users` – Get all users for swipe view

### Match
- `POST /api/match/swipe` – Send swipe left/right
- `GET /api/match/connections` – Fetch matches

### Chat
- `POST /api/chat/send` – Send a message
- `GET /api/chat/:userId` – Get chat history

(Use Postman or Swagger for testing APIs)

---

## 🤝 Contributing

Want to make this app better? Fork it, make your changes, and submit a PR 🚀

```bash
git checkout -b feature/YourFeature
git commit -m "Added your feature"
git push origin feature/YourFeature
```

---

## 🧠 Future Improvements

- 🛏️ Add geolocation-based discovery
- 🧪 Unit & Integration Tests
- 📛 Report/block user feature
- 🤖 AI match recommendation system
- 🔒 2FA login

---

## 📄 License

MIT License. Use it, modify it, and spread the love ❤️

---

## 👨‍💻 Author

Made with ❤️ by **Priyansh**  

---

