function initBurger () {
           
    const burger = document.querySelector('.burger')
    const panel = document.querySelector('.header__panel')

    burger.addEventListener('click', () => {
        if (!burger) return;
        burger.classList.toggle('active');
        panel.classList.toggle('active');
    });
}

initBurger();