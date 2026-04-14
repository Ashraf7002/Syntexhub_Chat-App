import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import MainChatLayout from "../components/MainChatLayout";

const socket = io("http://localhost:5000");

function Chat({ user }) {
  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Load conversations + ALL users
  useEffect(() => {
    console.log("Loading data for user:", user._id);
    
    // Load conversations
    axios.get(`http://localhost:5000/api/conversations/${user._id}`)
      .then(res => {
        console.log("Conversations loaded:", res.data);
        setConversations(res.data);
      })
      .catch(err => console.error("Conversations error:", err));

    // Load all users for "New Chat"
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        console.log("All users loaded:", res.data);
        const filteredUsers = res.data.filter(u => u._id !== user._id);
        setAllUsers(filteredUsers);
      })
      .catch(err => console.error("Users error:", err));
  }, [user]);

  // Socket logic
  useEffect(() => {
    socket.emit("join", user._id);

    socket.on("receiveMessage", (data) => {
      if (data.senderId !== user._id) {
        setMessages(prev => [...prev, data]);
      }
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
    };
  }, [user]);

  // Load messages
  useEffect(() => {
    if (receiver) {
      axios.get(`http://localhost:5000/api/messages/${user._id}/${receiver._id}`)
        .then(res => setMessages(res.data));
    }
  }, [receiver, user]);

  const sendMessage = async () => {
    if (!receiver || !message.trim()) return;

    const newMsg = {
      senderId: user._id,
      receiverId: receiver._id,
      text: message,
    };

    await axios.post("http://localhost:5000/api/messages/send", newMsg);
    socket.emit("sendMessage", newMsg);

    setMessages(prev => [...prev, newMsg]);
    setMessage("");
  };

  const users = allUsers.length > 0 ? allUsers : conversations.map(conv =>
    conv.members.find(m => m._id !== user._id)
  );

  console.log("Rendering Chat with users:", users.length, "allUsers:", allUsers.length);

  return (
    <>
      {users.length > 0 ? (
        <MainChatLayout
          users={users}
          receiver={receiver}
          setReceiver={setReceiver}
          messages={messages}
          user={user}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          onlineUsers={onlineUsers.map(id => String(id))}
        />
      ) : (
        <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to ZynChat!</h2>
            <p className="text-slate-400 mb-4">Loading your chats...</p>
            <button className="bg-whatsapp-green text-white px-6 py-2 rounded-xl font-semibold hover:bg-emerald-600 cursor-pointer" onClick={() => window.location.reload()}>
              Refresh
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;

