import React, { useState } from 'react';
import { setMasterKey, decryptData } from './crypto';
import { useStore } from './store';
import { Lock } from 'lucide-react';

export default function MasterKeyScreen({ onUnlock }: { onUnlock: () => void }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const isNew = !localStorage.getItem('secure-os-storage');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;

    try {
      setMasterKey(key);
      if (isNew) {
        useStore.persist.rehydrate();
        onUnlock();
      } else {
        const testItem = localStorage.getItem('secure-os-storage');
        if (testItem) {
           decryptData(testItem); 
        }
        await useStore.persist.rehydrate();
        onUnlock();
      }
    } catch (err) {
      setError('Decryption failed. Invalid Master Key.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{
      background: 'radial-gradient(circle at center, #1a1a1f 0%, #000 100%)'
    }}>
      <div className="max-w-md w-full glassmorphism p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Lock size={32} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">Cyber-Warrior OS</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          {isNew ? 'Create a Master Key to encrypt your local OS.' : 'Enter Master Key to decrypt ciphertext.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter Master Key"
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(''); }}
              className="w-full bg-black/60 border border-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition placeholder-gray-600"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 rounded-lg transition shadow-[0_0_20px_rgba(8,145,178,0.4)]"
          >
            {isNew ? 'Initialize Encrypted Storage' : 'Decrypt Local State'}
          </button>
        </form>
      </div>
    </div>
  );
}
