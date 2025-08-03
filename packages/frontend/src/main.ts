// src/main.ts
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    const div = document.createElement('div');
    div.innerHTML = `<p>✅ Vite is working and your Dapp is mounted here.</p>`;
    app.appendChild(div);
  }
});
