export function parseQuickAdd(text: string) {
  let title = text;
  let priority: 'P1' | 'P2' | 'P3' | 'P4' = 'P4';
  let dueDate: string | null = null;
  
  // Parse priority
  const pMatch = text.match(/\b(p[1-4])\b/i);
  if (pMatch) {
    priority = pMatch[1].toUpperCase() as 'P1' | 'P2' | 'P3' | 'P4';
    title = title.replace(pMatch[0], '');
  }

  // Very naive date parsing (real NLP would use nlp.js or chrono-node, but we simulate)
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'tomorrow', 'today'];
  const dayRegex = new RegExp(`\\b(${days.join('|')})\\b`, 'i');
  const dMatch = title.match(dayRegex);
  
  if (dMatch) {
    dueDate = dMatch[0]; // Just store the natural string for mockup
    title = title.replace(dMatch[0], '');
  }

  // Parse time
  const tMatch = title.match(/\b(\d{1,2}(:\d{2})?\s*(am|pm))\b/i);
  if (tMatch) {
    dueDate = dueDate ? `${dueDate} ${tMatch[1]}` : tMatch[1];
    title = title.replace(tMatch[0], '');
  }

  return {
    title: title.replace(/\s+/g, ' ').trim(),
    completed: false,
    priority,
    dueDate,
    subTasks: []
  };
}
