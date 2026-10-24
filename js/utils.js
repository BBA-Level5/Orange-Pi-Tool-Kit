// =======================
// UTILITY FUNCTIONS
// =======================

export function cleanInput(str) {
  return str ? str.trim() : '';
}

export function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerText;
    buttonElement.innerText = "Copied! ✓";
    buttonElement.classList.add('copied');
    
    setTimeout(() => {
      buttonElement.innerText = originalText;
      buttonElement.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}