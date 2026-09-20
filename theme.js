const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('xo-theme') || 'light';
html.setAttribute('data-theme', currentTheme);

toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('xo-theme', next);
});