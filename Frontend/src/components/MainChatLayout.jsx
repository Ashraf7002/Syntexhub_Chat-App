import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSidebar from './ChatSidebar';
import StatusBar from './StatusBar';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble.jsx';
import ChatInput from './ChatInput';
import NewChatModal from './NewChatModal';
import Button from './ui/button';
import { Menu, Search, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect, useRef } from 'react';

const MainChatLayout = ({
  users,
  receiver,
  setReceiver,
  messages,
  user,
  message,
  setMessage,
  sendMessage,
  onlineUsers
}) => {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const messagesEndRef = useRef(null);

  const handleLogout = () => {
    window.location.reload();
  };

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const handleSelectUser = (user) => {
    setReceiver(user);
    setShowNewChat(false);
  };

  return (
<div className="flex flex-col h-screen chat-bg text-white font-sans overscroll-none">
      {/* STATUS BAR */}
      <StatusBar onSearchClick={() => setShowSearch(true)} onMenuClick={() => setIsSidebarOpen(true)} onNewChat={handleNewChat} user={user} />
        {showNewChat && (
          <NewChatModal 
            users={users} 
            onSelectUser={handleSelectUser} 
            onClose={() => setShowNewChat(false)} 
          />
        )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <ChatSidebar 
          users={users}
          receiver={receiver}
          setReceiver={setReceiver}
          onlineUsers={onlineUsers}
          user={user}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 min-w-0 md:ml-0">
          {/* SEARCH BAR MOBILE */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="md:hidden bg-slate-900 border-b border-slate-800 p-3 sticky top-14 z-10 backdrop-blur-sm"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 rounded-xl border border-slate-700 focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
                    placeholder="Search chats, messages..."
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setShowSearch(false)}>
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CHAT HEADER */}
          {receiver ? (
            <ChatHeader receiver={receiver} onlineUsers={onlineUsers} onBack={() => setReceiver(null)} />
          ) : (
            <div className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            <h1 className="font-bold text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">ZynChat</h1>
              <div className="w-6" />
            </div>
          )}

          {/* MESSAGES AREA */}
          <div ref={messagesEndRef} className="flex-1 flex flex-col overflow-auto chat-bg px-6 py-4 md:p-8 space-y-4 md:pb-24 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
            {!receiver ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <div className="w-24 h-24 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                  <MessageCircle className="h-12 w-12 opacity-50" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No chat selected</h2>
                <p className="max-w-sm">Choose a chat or start a new conversation</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-1">Say hi to {receiver.name}!</h3>
                <p className="text-sm opacity-75">Send them a message and start chatting</p>
              </div>
            ) : (
messages.map((msg, i) => (
                <MessageBubble
                  key={msg._id || i}
                  message={msg}
                  user={user}
                  isOwn={msg.senderId === user._id}
                  index={messages.length - 1 - i}
                />
              ))
            )}
          </div>

          {/* INPUT */}
          {receiver && (
            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainChatLayout;

