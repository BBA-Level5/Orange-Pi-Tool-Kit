// =======================
// CARD 2: SCP COMPILER
// =======================

export function buildSendSCP(state) {
  const ip = state.ip || '<IP_ADDRESS>';
  const folder = state.folderName || 'Eco_bot';
  const file = state.fileName || '<FILE_NAME>';
  
  if (state.os === 'windows') {
    const user = state.username || '<USERNAME>';
    return `scp "C:\\Users\\${user}\\Desktop\\${folder}\\${file}" orangepi@${ip}:/home/orangepi/`;
  } else {
    return `scp ~/Desktop/${folder}/${file} orangepi@${ip}:/home/orangepi/`;
  }
}

export function buildFetchPrep(state) {
  const file = state.fileName || '<FILE_NAME>';
  const target = state.targetPath;
  return `sudo cp ${target}${file} /tmp/ && sudo chmod 644 /tmp/${file}`;
}

export function buildFetchSCP(state) {
  const ip = state.ip || '<IP_ADDRESS>';
  const folder = state.folderName || 'Eco_bot';
  const file = state.fileName || '<FILE_NAME>';

  if (state.os === 'windows') {
    const user = state.username || '<USERNAME>';
    return `scp orangepi@${ip}:/tmp/${file} "C:\\Users\\${user}\\Desktop\\${folder}\\"`;
  } else {
    return `scp orangepi@${ip}:/tmp/${file} ~/Desktop/${folder}/`;
  }
}

export function renderCardTransfer(state) {
  const sendEl = document.getElementById('cmd-send-scp');
  const fetchPrepEl = document.getElementById('cmd-fetch-prep');
  const fetchScpEl = document.getElementById('cmd-fetch-scp');

  if (sendEl) sendEl.textContent = buildSendSCP(state);
  if (fetchPrepEl) fetchPrepEl.textContent = buildFetchPrep(state);
  if (fetchScpEl) fetchScpEl.textContent = buildFetchSCP(state);
}