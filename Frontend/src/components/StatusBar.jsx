import { motion } from 'framer-motion';
import { Search, MoreHorizontal, Menu, Plus } from 'lucide-react';
import Avatar from './ui/avatar';
import Button from './ui/button';

const StatusBar = ({ onSearchClick, onMenuClick, onNewChat, user }) => {
  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="h-14 glass-pane backdrop-blur-xl border-b border-slate-800 shadow-elevated px-4 flex items-center justify-between shrink-0"
    >
      <div className="flex items-center gap-3">
        <Avatar name={user.name} className="border-2 border-white/50 shadow-glow cursor-pointer ring-2 ring-primary-500/30 animate-pulse-glow" />
        <div className="min-w-0">
          <p className="font-semibold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent truncate">{user.name}</p>
          <p className="text-xs text-primary-400 font-medium">Online</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="!p-2 !h-10 !w-10 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-glow border border-slate-700/50 hover:border-primary-500/50 transition-all duration-200 cursor-pointer" 
          onClick={onSearchClick || (() => alert('Search - Coming soon!'))}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="!p-2 !h-10 !w-10 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-glow border border-slate-700/50 hover:border-primary-500/50 transition-all duration-200 cursor-pointer" 
          onClick={onNewChat || (() => alert('New chat - Coming soon!'))}
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="!p-2 !h-10 !w-10 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-glow border border-slate-700/50 hover:border-primary-500/50 transition-all duration-200 cursor-pointer" 
          onClick={onMenuClick || (() => alert('Menu - Coming soon!'))}
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
        <Button 
          variant="destructive" 
          size="icon" 
          className="!h-11 !w-11 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-elevated hover:shadow-glow hover:scale-105 transition-all duration-200 cursor-pointer border-none" 
          onClick={() => window.location.reload()}
        >
          <span className="text-white font-semibold text-sm">Logout</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default StatusBar;

