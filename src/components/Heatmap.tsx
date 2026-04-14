import React from 'react';

export default function Heatmap() {
  // Generate fake data
  const days = 7;
  const weeks = 7;
  
  const blocks = Array.from({ length: days * weeks }).map((_, i) => {
    const intensity = Math.random();
    let bg = 'bg-gray-800/50';
    let border = 'border-gray-800';
    if (intensity > 0.8) { bg = 'bg-cyan-400'; border = 'border-cyan-400'; }
    else if (intensity > 0.5) { bg = 'bg-cyan-500/80'; border = 'border-cyan-500/80'; }
    else if (intensity > 0.2) { bg = 'bg-cyan-900/60'; border = 'border-cyan-900'; }
    
    return <div key={i} className={`w-3 h-3 rounded-xs border ${border} ${bg}`} />;
  });

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">Activity Matrix</h3>
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 p-2 bg-black/40 rounded-xl border border-white/5">
          {blocks}
        </div>
      </div>
    </div>
  );
}
