function initTheme () {
    const themeToggle = document.querySelector('.theme-toggle__button')
    const themeCircle = document.querySelector('.theme-toggle__circle')
    themeToggle.addEventListener('click', () => {
        themeCircle.classList.toggle('active')
    });
}

initTheme();


  