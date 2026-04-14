import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import Avatar from './ui/avatar';
import { CheckCheck, Clock } from 'lucide-react';

const MessageBubble = ({ message, user, isOwn, index }) => {
  const isLast = message.createdAt;
  const time = message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ scale: isOwn ? 1.02 : 1.01 }}
      className={cn(
"group mb-4 last:mb-2 max-w-[75%] md:max-w-[65%]",
        isOwn ? "ml-auto justify-end flex-row-reverse space-x-reverse space-x-3" : "mr-auto"
      )}
    >
      {!isOwn && (
        <Avatar 
            name={message.sender?.name || 'U'}
            className="w-10 h-10 ring-2 ring-slate-700/50 group-hover:ring-primary-500/50 transition-all duration-200 shadow-md flex-shrink-0"
          />
      )}
      <div className={cn(
        "chat-card flex flex-col p-4 rounded-2xl shadow-lg max-w-full relative group-hover:shadow-elevated transition-all duration-200",
        isOwn 
          ? "message-bubble-own text-slate-900 rounded-br-sm shadow-glow hover:shadow-glow hover:-translate-x-1" 
          : "bg-slate-800/90 text-white rounded-bl-sm hover:shadow-glow"
      )}>
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.text}</p>
        {isLast && (
          <div className={cn("flex items-center mt-2 pt-1 opacity-80 gap-1.5 text-xs", isOwn ? "justify-end" : "justify-start")}>
            <span className="font-medium tracking-wide">{time}</span>
            {isOwn && (
        <div className="flex -space-x-1">
                <CheckCheck className="w-4 h-4 text-slate-700 font-bold" />
                <CheckCheck className="w-4 h-4 text-slate-700 font-bold" />
              </div>
            )}
          </div>
        )}
        {/* Typing indicator placeholder */}
        {message.isTyping && !isOwn && (
          <div className="typing-indicator mt-2">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;

