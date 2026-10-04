function initBurger () {
           
    const burger = document.querySelector('.burger');
    const panelOpen = document.querySelector('.header__panel');
    const panelClose = document.querySelector('.closePanel');
    if (!panelOpen) return;
    if (!burger) return;
    if (!panelClose) return;
    burger.addEventListener('click', () => {
        burger.disabled = true;
        panelOpen.classList.add('active');
    });

    panelClose.addEventListener('click', () => {
        panelOpen.classList.remove('active');
        burger.disabled = false;
    });
}

initBurger();