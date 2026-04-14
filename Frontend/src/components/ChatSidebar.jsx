import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MoreVertical } from 'lucide-react';
import Avatar from './ui/avatar';
import Button from './ui/button';
import { cn } from '../lib/utils';

const ChatSidebar = ({ users, receiver, setReceiver, onlineUsers, user, isOpen, setIsOpen }) => {
  const [search, setSearch] = useState('');
  const [chatMenuOpen, setChatMenuOpen] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleChatMenu = (user) => {
    if (chatMenuOpen === user._id) {
      setChatMenuOpen(null);
    } else {
      setChatMenuOpen(user._id);
      setSelectedChat(user);
    }
  };

  const deleteChat = () => {
    // Simulate chat delete
    setReceiver(null);
    setChatMenuOpen(null);
    alert('Chat deleted!');
  };

  const handleChatClick = (u) => {
    setReceiver(u);
    if (isOpen) setIsOpen(false);
    setChatMenuOpen(null);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 30 }}
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 shadow-2xl",
          isOpen ? 'shadow-2xl' : ''
        )}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar name={user.name} />
            <div>
              <h2 className="font-semibold text-white">{user.name}</h2>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* SEARCH */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search chats"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-whatsapp-green focus:border-transparent"
            />
          </div>
        </div>

        {/* CHATS LIST */}
        <div className="flex-1 overflow-auto py-2">
          <AnimatePresence>
            {filteredUsers.map((u) => (
              <motion.div
                key={u._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  "p-4 cursor-pointer hover:bg-slate-800 rounded-xl mx-2 mb-2 border border-transparent transition-all relative group",
                  receiver?._id === u._id && "bg-whatsapp-green/10 border-whatsapp-green/30 shadow-md"
                )}
                onClick={() => handleChatClick(u)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar src={u.avatar} name={u.name} />
                      {onlineUsers.includes(u._id) && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-whatsapp-green border-3 border-slate-900 rounded-full" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">{u.name}</p>
                      <p className="text-xs text-slate-400 truncate">Last message preview...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <div className="text-xs text-slate-400">2:45</div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleChatMenu(u);
                      }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Chat Menu */}
                {chatMenuOpen === u._id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-slate-800/95 backdrop-blur border border-slate-700 rounded-lg shadow-2xl z-10 min-w-[140px] py-1"
                  >
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-10 text-left hover:bg-slate-700 px-3 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat();
                      }}
                    >
                      Delete chat
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-10 text-left hover:bg-slate-700 px-3 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Pin chat
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-10 text-left hover:bg-slate-700 px-3 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Mute notifications
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
};

export default ChatSidebar;

