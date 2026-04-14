import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Power } from 'lucide-react';
import { useStore } from './store';

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const { tasks, deleteTask } = useStore();

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-xl bg-[#111115] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="flex items-center px-4 py-3 border-b border-white/5">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <input
            autoFocus
            type="text"
            className="w-full bg-transparent border-none text-white focus:outline-none placeholder-gray-500 text-lg"
            placeholder="Type a command or search tasks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-block border border-gray-700 bg-gray-900 rounded px-2 py-1 text-xs text-gray-400 font-mono">ESC</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto py-2 custom-scrollbar">
          {query.length > 0 && filteredTasks.length === 0 && (
            <div className="p-4 text-center text-gray-500">No results found.</div>
          )}
          
          {filteredTasks.length > 0 && (
            <div className="px-2">
              <div className="px-2 py-1 text-xs font-semibold text-gray-500">TASKS</div>
              {filteredTasks.map(t => (
                <div key={t.id} className="flex items-center justify-between px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer group text-gray-300 hover:text-white">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${t.completed ? 'bg-green-500' : 'bg-cyan-500'}`} />
                    {t.title}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteTask(t.id); }} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="px-2 mt-4">
            <div className="px-2 py-1 text-xs font-semibold text-gray-500">SYSTEM COMMANDS</div>
            <div className="flex items-center px-3 py-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg cursor-pointer text-gray-300" onClick={() => {
              localStorage.removeItem('secure-os-storage');
              window.location.reload();
            }}>
              <Power className="w-4 h-4 mr-3" /> Lock & Clear Key
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
