function initSlider(container, gap) {
    const list = container.querySelector('ul');
    const prevArrows = container.querySelectorAll('.gallery__arrow--prev');
    const nextArrows = container.querySelectorAll('.gallery__arrow--next');
    const card = list.querySelector('li');
    const offset = card.offsetWidth + gap;
    const lastCard = list.lastElementChild;
    const firstCard = list.firstElementChild;
    if (!prevArrows.length || !nextArrows.length ) return;
    if (!card) return;

    nextArrows.forEach((next) => {
        next.addEventListener('click', () => {
            list.scrollBy({ left: offset, behavior: "smooth" });
        })
    })
    

    prevArrows.forEach((prev) => {
        prev.addEventListener('click', () => {
            list.scrollBy({ left: -offset, behavior: "smooth" });
        })
    })

    const callbackCreator = function (containerElement, arrowSelector) {
        return (entries) => {
            entries.forEach((entry) => {
                const arrows = containerElement.querySelectorAll(arrowSelector);
                arrows.forEach((arrow) => {
                    arrow.disabled = entry.isIntersecting;
                })
            });
        }
    }
    
    const options = {
        root: list,
        rootMargin: '0px',
        threshold: 0.8,
    }
    
    const observerLast = new IntersectionObserver(callbackCreator(container, '.gallery__arrow--next'), options)
    observerLast.observe(lastCard);

    const observerFirst = new IntersectionObserver(callbackCreator(container, '.gallery__arrow--prev'), options);
    observerFirst.observe(firstCard);

}