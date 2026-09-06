export function initSlider(container, gap) {
    const list = container.querySelector('ul');
    const card = list.querySelector('li');
    if (!card) return;
    const offset = card.offsetWidth + gap;
    const lastCard = list.lastElementChild;
    const firstCard = list.firstElementChild;


    container.addEventListener('click', (event) => {
        const btn = event.target.closest('.gallery__arrow');
        if (!btn) return;
        
        if (btn.classList.contains('gallery__arrow--next')) {
            list.scrollBy({ left: offset, behavior: 'smooth' });
        } else {
            list.scrollBy({ left: -offset, behavior: 'smooth' });
        }
    });

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

