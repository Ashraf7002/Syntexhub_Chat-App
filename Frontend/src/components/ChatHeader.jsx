import { motion } from 'framer-motion';
import { Phone, Video, MoreVertical, ChevronLeft } from 'lucide-react';
import Avatar from './ui/avatar';
import Button from './ui/button';
import { cn } from '../lib/utils';

const ChatHeader = ({ receiver, onlineUsers, onBack }) => {
  const isOnline = receiver && onlineUsers.includes(receiver._id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 flex items-center justify-between shrink-0"
    >
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Avatar name={receiver?.name} className="flex-shrink-0" />
        <div className="min-w-0">
          <p className="font-semibold text-white truncate">{receiver?.name}</p>
          <p className={cn("text-xs", isOnline ? "text-whatsapp-green" : "text-slate-400")}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
