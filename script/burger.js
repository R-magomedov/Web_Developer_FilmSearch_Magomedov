function initBurger () {
           
    const burger = document.querySelector('.burger')
    const panel = document.querySelector('.header__panel')

    if (!burger) return;
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        panel.classList.toggle('active');
    });
}

initBurger();