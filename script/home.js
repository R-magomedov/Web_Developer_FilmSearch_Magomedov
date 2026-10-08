import { fetchMovies } from "./api.js";
import { searchForm, showMovies } from "./render-cards.js";
import { initSlider } from "./slider.js";

async function initGallery() {
    const API_URL =
        'https://api.poiskkino.dev/v1.5/movie?notNullFields=name,rating.kp,poster.url&limit=6&withCount=false';

    searchForm((data) => {
        document.querySelector('#ul')?.scrollIntoView({ behavior: 'smooth' });
        showMovies(data.docs, 'ul');
        initSlider(document.querySelector('.gallery'), 60);

    });

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
    heroArrow.addEventListener('click', () => {
        gallery.scrollIntoView({ behavior: 'smooth' });
    });
}

initGallery();