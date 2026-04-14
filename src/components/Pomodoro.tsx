import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">{isBreak ? 'Deep Rest' : 'Deep Work'}</h3>
      <div className="relative">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="60" className="stroke-gray-800" strokeWidth="4" fill="none" />
          <motion.circle 
            cx="64" cy="64" r="60" 
            className="stroke-cyan-500" 
            strokeWidth="4" fill="none" 
            strokeDasharray="377"
            strokeDashoffset={377 - (377 * (377 - (timeLeft / ((isBreak ? 5 : 25) * 60)) * 377)) / 377}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 377 - (timeLeft / ((isBreak ? 5 : 25) * 60)) * 377 }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold font-mono tracking-tighter text-white">
            {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex mt-6 space-x-4">
        <button onClick={toggle} className="p-3 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
          {isActive ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={reset} className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors border border-gray-700">
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}
