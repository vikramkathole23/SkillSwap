
📘 SkillSwap

SkillSwap is a platform where people can share skills with others by teaching what they know and learning from the community. 🚀
It’s built with the idea of collaborative learning—you teach something, and in return, you learn something new.


---

✨ Features

🔑 User Authentication (sign up, login, logout)

📚 Add & Share Skills you can teach

🔍 Discover Skills from others

💬 Interactive Skill Dialogs & Profiles

🎨 Modern UI with smooth animations



---

🛠️ Tech Stack

Frontend

⚛️ React (with Hooks)

🎨 Tailwind CSS + Material UI

🔄 Axios for API calls


Backend

🟢 Node.js + Express

🗄️ MongoDB with Mongoose

🔐 JWT for Authentication



---

🚀 Getting Started

1️⃣ Clone the Repo

git clone https://github.com/your-username/skillswap.git

cd skillswap

2️⃣ Install Dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install

3️⃣ Setup Environment Variables

Create a .env file in backend/ with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the App

Backend

npm run dev

Frontend

npm start

App runs on:

Frontend 👉 http://localhost:3000

Backend 👉 http://localhost:5000


---

📂 Project Structure

SkillSwap/
│── backend/        # Node.js + Express API
│   ├── models/     # Mongoose schemas
│   ├── routes/     # API endpoints
│   ├── controllers/# Logic
│   └── index.js    # Main server
│
│── frontend/       # React app
│   ├── src/
│   │   ├── components/ # react components 
│   │   ├── pages/📃    #main pages
│   │   └── App.jsx
│
└── README.md

