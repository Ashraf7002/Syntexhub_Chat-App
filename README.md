# 🚀 ZynkChat – Real-Time Chat Application

ZynkChat is a **full-stack real-time chat application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Socket.io** for instant messaging.

This project demonstrates a **production-level chat system** similar to WhatsApp, where users can register, login, and communicate in real-time.

---

## ✨ Features

* 🔐 User Authentication (Register/Login)
* 💬 Real-Time Messaging (Socket.io)
* 🟢 Online/Offline User Status
* ✍️ Typing Indicator
* 📂 Conversation-Based Chat (No random users)
* 🧠 Prevent Duplicate Users (Unique Email)
* 🎨 Clean & Modern UI
* ⚡ Fast & Responsive Experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io

---

## 📁 Project Structure

```
chat-app/
│
├── client/        # React Frontend
│   ├── src/
│   └── ...
│
├── server/        # Backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/zynkchat.git
cd zynkchat
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🌐 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Messages

* `POST /api/messages/send`
* `GET /api/messages/:user1/:user2`

### Conversations

* `POST /api/conversations`
* `GET /api/conversations/:userId`

### Users (Search)

* `GET /api/users`

---

## 🔄 How It Works

1. User registers and logs in
2. Starts a conversation with another user
3. Messages are sent in real-time using Socket.io
4. Only active conversations are shown (no random users)
5. Online users and typing indicators update instantly

---

## 🎯 Future Improvements

* 🔍 Search Users UI
* 🖼️ Profile Avatars
* ✔✔ Message Seen Status
* 📱 Mobile Responsive UI
* 🔔 Notifications

---

## 📸 Screenshots

*Add your project screenshots here*

---

## 👨‍💻 Author

**Ashraf Ali**

* 💼 Web Developer Intern
* 🌐 Passionate about Full Stack Development

---

## ⭐ Acknowledgment

This project was built as part of an internship to demonstrate **real-world full-stack development skills**.

---

## 📌 Note

This is a **learning + portfolio project**, but follows **industry-level architecture and practices**.

---

⭐ If you like this project, don’t forget to star the repo!
