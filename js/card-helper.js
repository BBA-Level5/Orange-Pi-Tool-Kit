// =======================
// CARD 5: HELPER SEARCH ENGINE
// =======================

const commandCatalog = [
  {
    id: 'list-all',
    title: 'List Files (Detailed)',
    keywords: ['list', 'files', 'show', 'dir', 'contents', 'folder'],
    getCommand: (s) => `ls -la ${s.targetPath}`,
    desc: 'Shows all files, hidden files, sizes, and owners in the project folder.'
  },
  {
    id: 'run-py',
    title: 'Execute Python Script',
    keywords: ['run', 'python', 'execute', 'script', 'start'],
    getCommand: (s) => `python3 ${s.targetPath}${s.fileName || 'script.py'}`,
    desc: 'Executes the transferred Python file.'
  },
  {
    id: 'check-ip',
    title: 'Check IP Address',
    keywords: ['ip', 'network', 'wifi', 'address', 'check'],
    getCommand: (s) => `ip a`,
    desc: 'Shows all network interfaces and IP addresses on the Orange Pi.'
  }
];

export function renderCardHelper(state, searchTerm = '') {
  const container = document.getElementById('helper-results');
  if (!container) return;

  container.innerHTML = '';
  const term = searchTerm.toLowerCase();
  
  // Filter catalog by search term (show all if empty)
  const matches = commandCatalog.filter(cmd => 
    term === '' || cmd.keywords.some(kw => kw.includes(term)) || cmd.title.toLowerCase().includes(term)
  );

  matches.forEach(cmd => {
    const safeId = `cmd-${cmd.id}`;
    const html = `
      <div class="helper-item">
        <div class="helper-header">
          <strong>${cmd.title}</strong>
        </div>
        <div class="command-block">
          <pre><code id="${safeId}">${cmd.getCommand(state)}</code></pre>
          <button class="copy-btn dynamic-copy" data-target="${safeId}">Copy</button>
        </div>
        <p class="helper-desc">${cmd.desc}</p>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
}