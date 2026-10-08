import { fetchMovies } from "./api.js";
import { searchForm, showMovies } from "./render-cards.js";
import { initSlider } from "./slider.js";

// Загружает карточки для главной страницы и подключает поиск.
async function initGallery() {
    const API_URL =
        'https://api.poiskkino.dev/v1.5/movie?notNullFields=name,rating.kp,poster.url&limit=6&withCount=false';

    // Результаты поиска заменяют карточки в галерее.
    searchForm((data) => {
        document.querySelector('#ul')?.scrollIntoView({ behavior: 'smooth' });
        showMovies(data.docs, 'ul');
        initSlider(document.querySelector('.gallery'), 60);

    });

    // При первой загрузке показываем подборку фильмов из API.
    try {
        const data = await fetchMovies(API_URL);
        if (data.docs && data.docs.length > 0) {
            showMovies(data.docs, 'ul');
            initSlider(document.querySelector('.gallery'), 60);
        }

    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}

const heroArrow = document.querySelector('.hero__arrow');
const gallery = document.querySelector('.gallery');
if (heroArrow && gallery) {
    // Стрелка в первом экране прокручивает страницу к галерее.
    heroArrow.addEventListener('click', () => {
        gallery.scrollIntoView({ behavior: 'smooth' });
    });
}

initGallery();
