import { fetchMovies } from "./api.js";
import { searchForm, showMovies } from "./render-cards.js";
import { initSlider } from "./slider.js";

async function initGallery() {
    const API_URL =
        'https://api.poiskkino.dev/v1.5/movie?notNullFields=name,rating.kp,poster.url&limit=6&withCount=false';
    try {
        const data = await fetchMovies(API_URL);
        if (data.docs && data.docs.length > 0) {
            showMovies(data.docs, 'ul');
            initSlider(document.querySelector('.gallery'), 60);
        }
        searchForm((data) => {
            document.querySelector('#ul').scrollIntoView({ behavior: 'smooth' });
            showMovies(data.docs, 'ul');
        });
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}

initGallery();