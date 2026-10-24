// =======================
// MASTER CONTROLLER
// =======================
import { getState, updateState } from './state.js';
import { copyToClipboard } from './utils.js';
import { renderCardSSH } from './card-ssh.js';
import { renderCardTransfer } from './card-transfer.js';
import { renderCardMove } from './card-move.js';
import { renderCardHelper } from './card-helper.js';

function initApp() {
  setupInputListeners();
  setupUIEvents();
  triggerRender(); 
}

function setupInputListeners() {
  document.querySelectorAll('input[name="os"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateState('os', e.target.value);
      triggerRender();
    });
  });

  const inputs = ['username', 'filename', 'ip'];
  inputs.forEach(id => {
    const el = document.getElementById(`input-${id}`);
    if (el) {
      el.addEventListener('input', (e) => {
        const key = id === 'filename' ? 'fileName' : id; 
        updateState(key, e.target.value.trim());
        triggerRender();
      });
    }
  });

  // Card 5 Search Listener
  const searchEl = document.getElementById('helper-search');
  if (searchEl) {
    searchEl.addEventListener('input', (e) => {
      renderCardHelper(getState(), e.target.value);
      attachDynamicCopyListeners();
    });
  }
}

function setupUIEvents() {
  // Setup Static Copy Buttons
  document.querySelectorAll('.copy-btn:not(.dynamic-copy)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.target.getAttribute('data-target');
      const textToCopy = document.getElementById(targetId).textContent;
      copyToClipboard(textToCopy, e.target);
    });
  });

  // Setup Card 2 Upload/Download Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const direction = e.target.getAttribute('data-direction');
      document.getElementById('panel-to-pi').classList.add('hidden');
      document.getElementById('panel-from-pi').classList.add('hidden');
      document.getElementById(`panel-${direction}`).classList.remove('hidden');
    });
  });

  // Setup Accordion Toggle Buttons
  document.querySelectorAll('.card-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      card.classList.toggle('collapsed');
    });
  });

  // Setup Card 5 Quick Tags
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const kw = e.target.getAttribute('data-keyword');
      const searchEl = document.getElementById('helper-search');
      searchEl.value = kw;
      renderCardHelper(getState(), kw);
      attachDynamicCopyListeners();
    });
  });
}

function attachDynamicCopyListeners() {
  document.querySelectorAll('.dynamic-copy').forEach(btn => {
    // Remove old listeners to prevent duplicates
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
      const targetId = e.target.getAttribute('data-target');
      const textToCopy = document.getElementById(targetId).textContent;
      import('./utils.js').then(module => {
        module.copyToClipboard(textToCopy, e.target);
      });
    });
  });
}

function triggerRender() {
  const currentState = getState();
  renderCardSSH(currentState);
  renderCardTransfer(currentState);
  renderCardMove(currentState);
  
  const searchEl = document.getElementById('helper-search');
  const term = searchEl ? searchEl.value : '';
  renderCardHelper(currentState, term);
  attachDynamicCopyListeners();
}

document.addEventListener('DOMContentLoaded', initApp);