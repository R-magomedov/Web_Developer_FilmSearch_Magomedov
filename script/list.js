import { fetchMovies } from "./api.js";
import { buildApi } from "./listBuildApi.js";
import { searchForm, showMovies } from "./render-cards.js";
import { initSlider } from "./slider.js";

const itemsPerPage = 9;

let allMovies = [];
let currentPage = 1;
let currentGenre = '';
let currentCountry = '';
let currentYear = '';
let currentRating = '';

const genre = document.getElementById('genre')
genre.addEventListener('change', () => {
    currentGenre = genre.value;
    toggleActive(genre);
    loadMovies();
});

const country = document.getElementById('country');
country.addEventListener('change', () => {
    currentCountry = country.value;
    toggleActive(country);
    loadMovies();
});

const year = document.getElementById('year');
year.addEventListener('change', () => {
    currentYear = year.value;
    toggleActive(year);
    loadMovies();
});

const rating = document.getElementById('rating');
rating.addEventListener('change', () => {
    currentRating = rating.value;
    toggleActive(rating);
    loadMovies();
});

function toggleActive(select) {
    select.classList.toggle('active', !!select.value)
}

async function loadMovies() {
    try {
        const url = buildApi({
            genre: currentGenre,
            rating: currentRating,
            year: currentYear,
            country: currentCountry
        });
        const data = await fetchMovies(url);
        allMovies = data.docs || [];
        renderPage(1);
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}

function renderPage(pageNum) {
    currentPage = pageNum;

    const start = (pageNum - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageMovies = allMovies.slice(start, end);

    showMovies(pageMovies, 'ul');
    updatePageNumbers();

};

function updatePageNumbers() {
    const container = document.querySelector('.pages');
    const maxPages  = Math.ceil(allMovies.length / itemsPerPage);
    container.innerHTML = '';


    for (let i = 1; i <= maxPages; i++) {
        const btn = document.createElement('span');
        btn.textContent = i;
        btn.className = 'page';

        if (i === currentPage) {
            btn.classList.add('page--active');
        }

        btn.addEventListener('click', () => {
            renderPage(i);
        })

        container.appendChild(btn);
    }
};

async function initCatalog() {
    await loadMovies();
    initSlider(document.querySelector('.catalog__slider'), 15);
    searchForm((data) => {
        document.querySelector('#ul').scrollIntoView({ behavior: 'smooth' });
        showMovies(data.docs, 'ul')
    });
}

initCatalog();