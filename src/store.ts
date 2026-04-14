import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { encryptData, decryptData, hasMasterKey } from './crypto';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  dueDate: string | null;
  subTasks: SubTask[];
  createdAt: string;
}

interface AppState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addSubTask: (taskId: string, subTaskTitle: string) => void;
  toggleSubTask: (taskId: string, subTaskId: string) => void;
}

const customStorage = {
  getItem: (name: string): string | null => {
    const item = localStorage.getItem(name);
    if (!item) return null;
    if (!hasMasterKey()) return null; 
    try {
      return decryptData(item);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (hasMasterKey()) {
      localStorage.setItem(name, encryptData(value));
    }
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  },
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      addSubTask: (taskId, subTitle) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  subTasks: [
                    ...t.subTasks,
                    { id: crypto.randomUUID(), title: subTitle, completed: false },
                  ],
                }
              : t
          ),
        })),
      toggleSubTask: (taskId, subTaskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  subTasks: t.subTasks.map((s) =>
                    s.id === subTaskId ? { ...s, completed: !s.completed } : s
                  ),
                }
              : t
          ),
        })),
    }),
    {
      name: 'secure-os-storage',
      storage: createJSONStorage(() => customStorage),
      // rehydration happens after key entry, we control this by calling useStore.persist.rehydrate()
      skipHydration: true, 
    }
  )
);
