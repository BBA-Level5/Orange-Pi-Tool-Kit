// =======================
// CENTRAL STATE STORE
// =======================

const state = {
  os: 'windows',
  username: '',
  folderName: 'Eco_bot', // Default as requested
  fileName: '',
  ip: '',
  targetPath: '/opt/bigbang/students/ai_eco_bot/ECO/'
};

/**
 * Returns a read-only copy of the current state.
 */
export function getState() {
  return { ...state };
}

/**
 * Updates a specific key in the state.
 */
export function updateState(key, value) {
  if (state.hasOwnProperty(key)) {
    state[key] = value;
  }
}