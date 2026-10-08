// Восстанавливает сохранённую тему и переключает её по кнопке.
function initTheme() {
    const toggleBtn = document.querySelector('.theme-toggle__button');
    const html = document.documentElement; 

    if (!toggleBtn) return;
    const savedTheme = localStorage.getItem('theme');
    
    // После обновления страницы остаётся последняя выбранная тема.
    if (savedTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    }
    
    toggleBtn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
  
  initTheme();
