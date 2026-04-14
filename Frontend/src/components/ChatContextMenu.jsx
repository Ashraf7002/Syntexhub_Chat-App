import { motion } from 'framer-motion';
import { Edit, Trash2, Copy, Forward } from 'lucide-react';
import Button from './ui/button';

const ChatContextMenu = ({ x, y, message, onEdit, onDelete, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed z-50 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl shadow-black/50 min-w-[200px] p-2"
      style={{ top: y, left: x }}
    >
      <Button 
        variant="ghost" 
        className="w-full justify-start h-12 text-left hover:bg-slate-800 hover:text-white rounded-lg px-3 gap-3"
        onClick={() => {
          onEdit(message);
          onClose();
        }}
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      
      <Button 
        variant="ghost" 
        className="w-full justify-start h-12 text-left hover:bg-slate-800 hover:text-white rounded-lg px-3 gap-3"
        onClick={() => {
          navigator.clipboard.writeText(message.text);
          onClose();
        }}
      >
        <Copy className="h-4 w-4" />
        Copy
      </Button>
      
      <Button 
        variant="ghost" 
        className="w-full justify-start h-12 text-left hover:bg-slate-800 hover:text-white rounded-lg px-3 gap-3"
        onClick={() => {
          onClose();
        }}
      >
        <Forward className="h-4 w-4" />
        Forward
      </Button>
      
      <Button 
        variant="destructive" 
        className="w-full justify-start h-12 text-left hover:bg-red-600 rounded-lg px-3 gap-3"
        onClick={() => {
          onDelete(message);
          onClose();
        }}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </motion.div>
  );
};

export default ChatContextMenu;

