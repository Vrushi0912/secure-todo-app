import React, { useState } from 'react';
import MasterKeyScreen from './MasterKeyScreen';
import Dashboard from './Dashboard';

function App() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <MasterKeyScreen onUnlock={() => setUnlocked(true)} />;
  }

  return <Dashboard />;
}

export default App;
