// =======================
// CARD 3: SUDO MOVE COMPILER
// =======================

export function buildSudoMove(state) {
  const fileName = state.fileName || '<FILE_NAME>';
  const target = state.targetPath;
  return `sudo mv /home/orangepi/${fileName} ${target}`;
}

export function renderCardMove(state) {
  const codeEl = document.getElementById('cmd-sudo-mv');
  if (codeEl) {
    codeEl.textContent = buildSudoMove(state);
  }
}