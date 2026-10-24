// =======================
// CARD 1: SSH COMPILER
// =======================

export function buildSshCommand(state) {
  const ip = state.ip ? state.ip : '<IP_ADDRESS>';
  return `ssh orangepi@${ip}`;
}

export function renderCardSSH(state) {
  const codeElement = document.getElementById('cmd-ssh');
  if (codeElement) {
    codeElement.textContent = buildSshCommand(state);
  }
}