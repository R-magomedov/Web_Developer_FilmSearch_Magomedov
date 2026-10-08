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
let lastRequestId = 0;

// Каждый фильтр обновляет список с учётом всех выбранных значений.
const genre = document.getElementById('genre');
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

// Загружает фильмы по фильтрам. Устаревший ответ не меняет каталог.
async function loadMovies() {
    const requestId = ++lastRequestId;

    try {
        const url = buildApi({
            genre: currentGenre,
            rating: currentRating,
            year: currentYear,
            country: currentCountry
        });
        const data = await fetchMovies(url);
        if (requestId !== lastRequestId) return;

        allMovies = data.docs || [];
        renderPage(1);
    } catch (error) {
        if (requestId !== lastRequestId) return;

        console.error('Ошибка сети:', error);
    }
}

// Отрисовывает выбранную страницу каталога и обновляет слайдер на мобильных устройствах.
function renderPage(pageNum) {
    currentPage = pageNum;

    const start = (pageNum - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageMovies = allMovies.slice(start, end);

    showMovies(pageMovies, 'ul');
    updatePageNumbers();
    initSlider(document.querySelector('.catalog__slider'), 15);
};

// Создаёт номера страниц для текущего списка фильмов.
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

// Подключает поиск и загружает каталог при открытии страницы.
async function initCatalog() {
    searchForm((data) => {
        lastRequestId++;
        document.querySelector('#ul')?.scrollIntoView({ behavior: 'smooth' });
        allMovies = data.docs;
        renderPage(1);
    });
    await loadMovies();
}

initCatalog();
