// Fungsi reusable untuk membuat code block otomatis
function renderCodeBlock(targetId, title, codeString) {
  const container = document.getElementById(targetId);
  if (!container) return;

  // Escape HTML karakter agar tag seperti <div> tidak dieksekusi sebagai HTML asli
  const escapedCode = codeString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const template = `
    <div class="code-wrapper">
      <div class="code-header">
        <span class="code-lang">${title}</span>
        <button class="copy-btn" onclick="copyCode(this)">
          <svg class="copy-icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          <span>Copy</span>
        </button>
      </div>
      <pre class="code-block"><code>${escapedCode}</code></pre>
    </div>
  `;
  
  container.innerHTML = template;
}

// Fungsi global untuk handling copy button
function copyCode(button) {
  const wrapper = button.closest('.code-wrapper');
  const codeText = wrapper.querySelector('.code-block code').innerText;
  
  navigator.clipboard.writeText(codeText).then(() => {
    const btnText = button.querySelector('span');
    btnText.innerText = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      btnText.innerText = 'Copy';
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Gagal menyalin: ', err);
  });
}