// type=movie
// rating.kp=7-10
// releaseYears.end=2020-2026
// genres.name=
// countries.name=

import { fetchMovies } from "./api.js";
import { searchForm, showMovies } from "./render-cards.js";
import { initSlider } from "./slider.js";

const API_LIST = 'https://api.poiskkino.dev/v1.5/movie?notNullFields=name,rating.kp,poster.url&limit=45&withCount=false';

let currentPage = 1;
const itemsPerPage = 9;
let allMovies = [];


async function initCatalog() {
    try {
        const data = await fetchMovies(API_LIST);
        allMovies = data.docs || [];
        renderPage(1);
        initSlider(document.querySelector('.catalog__slider'), 15);
        searchForm((data) => {
            document.querySelector('#ul').scrollIntoView({ behavior: 'smooth' });
            showMovies(data.docs, 'ul')
        });


    } catch (error) {
        console.error('Ошибка сети:', error);
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
        container.innerHTML = '';


        for (let i = 1; i <= 5; i++) {
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

}

initCatalog();