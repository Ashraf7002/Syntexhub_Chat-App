import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, Image, Smile, Send } from 'lucide-react';
import Button from './ui/button';

const ChatInput = ({ message, setMessage, sendMessage, placeholder = "Type a message" }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage();
    }
  };

  const comingSoon = (feature) => {
    alert(`${feature} - Coming soon!`);
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-4 flex items-end gap-2 shrink-0"
    >
      <form onSubmit={handleSubmit} className="flex-1 flex items-end gap-2">
        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-2xl flex-1 border border-slate-700 hover:border-slate-600 transition-colors">
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9 p-0 shrink-0" onClick={() => comingSoon('Emoji picker')}>
            <Smile className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9 p-0 shrink-0" onClick={() => comingSoon('File upload')}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-400 p-0 focus:ring-0 resize-none h-5"
          />
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9 p-0 shrink-0" onClick={() => comingSoon('Gallery')}>
            <Image className="h-4 w-4" />
          </Button>
        </div>
        
        <Button type="submit" size="icon" className="h-12 w-12 rounded-2xl shadow-lg hover:shadow-xl bg-whatsapp-green hover:bg-whatsapp-dark">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </motion.div>
  );
};

export default ChatInput;

