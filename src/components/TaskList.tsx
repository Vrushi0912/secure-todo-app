import React, { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Wand2, Plus, GripVertical } from 'lucide-react';

export default function TaskList() {
  const { tasks, toggleTask, deleteTask, addSubTask, toggleSubTask } = useStore();

  const handleMagicBreakdown = (taskId: string) => {
    // Simulate AI subtask generation
    setTimeout(() => {
      ['Analyze requirements', 'Setup scaffolding', 'Implement core logic', 'Write tests', 'Deploy'].forEach(sub => {
        addSubTask(taskId, sub);
      });
    }, 1000);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        <p>No active tasks. Use the Quick Add bar above.</p>
        <p className="text-xs mt-2">Example: "Review PRs P2 tomorrow 10am"</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className={`group bg-[#111115] border border-white/5 rounded-xl p-4 transition-colors ${task.completed ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start">
              <div 
                onClick={() => toggleTask(task.id)}
                className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 cursor-pointer flex items-center justify-center transition-colors 
                  ${task.completed ? 'bg-cyan-500 border-cyan-500' : 'border-gray-500 hover:border-cyan-400'}`}
              >
                {task.completed && <Check size={12} className="text-black" />}
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-base font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {task.title}
                  </p>
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${task.priority === 'P1' ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 
                          task.priority === 'P2' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/20' :
                          'bg-gray-800 text-gray-400'}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtasks */}
                {task.subTasks && task.subTasks.length > 0 && (
                  <div className="mt-3 space-y-2 border-l-2 border-white/10 pl-3">
                    {task.subTasks.map(sub => (
                      <div key={sub.id} className="flex items-center group/sub">
                        <div 
                          onClick={() => toggleSubTask(task.id, sub.id)}
                          className={`w-4 h-4 rounded-sm border cursor-pointer flex items-center justify-center
                            ${sub.completed ? 'bg-cyan-500 border-cyan-500' : 'border-gray-600 hover:border-cyan-400'}`}
                        >
                          {sub.completed && <Check size={10} className="text-black" />}
                        </div>
                        <span className={`ml-2 text-sm ${sub.completed ? 'line-through text-gray-600' : 'text-gray-400'}`}>
                          {sub.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleMagicBreakdown(task.id)}
                    className="text-xs flex items-center text-purple-400 hover:text-purple-300"
                    title="Magic AI Breakdown"
                  >
                    <Wand2 size={12} className="mr-1" /> Auto-breakdown
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-xs flex items-center text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={12} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
