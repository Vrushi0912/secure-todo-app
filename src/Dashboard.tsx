import React, { useState, useEffect } from 'react';
import { useStore } from './store';
import { motion, AnimatePresence } from 'framer-motion';
import Pomodoro from './components/Pomodoro';
import Heatmap from './components/Heatmap';
import TaskList from './components/TaskList';
import CommandPalette from './CommandPalette';
import { Plus, Search, Brain, Shield } from 'lucide-react';
import { parseQuickAdd } from './utils/nlp';

export default function Dashboard() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [quickAddText, setQuickAddText] = useState('');
  const addTask = useStore(state => state.addTask);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddText.trim()) return;
    const task = parseQuickAdd(quickAddText);
    addTask(task);
    setQuickAddText('');
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-gray-100 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight text-white">OS.Core</h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center"><Brain className="w-4 h-4 mr-2" /> AI Active</span>
            <span className="hidden md:flex border border-gray-800 rounded px-2 py-1 bg-black/50">
              Ctrl + K to CMD
            </span>
          </div>
        </header>

        {/* Quick Add NLP Bar */}
        <motion.form 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleQuickAdd} 
          className="relative group"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-cyan-500">
            <Plus className="w-5 h-5 group-focus-within:rotate-90 transition-transform duration-300" />
          </div>
          <input
            type="text"
            value={quickAddText}
            onChange={(e) => setQuickAddText(e.target.value)}
            placeholder="Quick Add e.g. 'Submit MCA project P1 Monday 5pm'..."
            className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] transition-all shadow-lg placeholder-gray-500"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block border border-gray-700 bg-gray-900 rounded px-2 py-1 text-xs text-gray-400 font-mono">Enter ↵</kbd>
          </div>
        </motion.form>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {/* Main Task List */}
          <div className="md:col-span-2 glassmorphism border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-xl flex flex-col min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
              Active Protocol 
              <span className="ml-3 bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-full border border-cyan-500/20">Secure</span>
            </h2>
            <TaskList />
          </div>

          <div className="space-y-6 md:col-span-1">
            {/* Pomodoro */}
            <div className="glassmorphism border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-xl">
              <Pomodoro />
            </div>

            {/* Heatmap */}
            <div className="glassmorphism border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-xl">
              <Heatmap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
