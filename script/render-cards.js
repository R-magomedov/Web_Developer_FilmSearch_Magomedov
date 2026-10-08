import { fetchMovieid, fetchMovies } from "./api.js";

const API_SEARCH_URL =
    'https://api.poiskkino.dev/v1.5/movie/search?page=1&limit=10&selectFields=&notNullFields=name,rating.kp,poster.url&query=';

function getRatingClass(rating) {
    if (rating === null || rating === undefined) return '';
    if (rating >= 7.5) return 'movie-card__rating--high';
    if (rating >= 5) return 'movie-card__rating--medium';
    return 'movie-card__rating--low';
}

function showMovies(movies, ul) {
    const movieList = document.getElementById(ul);
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.className = 'movie-card';
        const rating = movie.rating?.kp ?? movie.rating?.imdb;
        const ratingFixed = typeof rating === 'number' ? rating.toFixed(1) : '—';
        const posterUrl = movie.poster?.url;
        const movieName = movie.name || 'Название не указано';


        li.innerHTML = `
        <div class="movie-card__overlay">
          <div class="movie-card__rating ${getRatingClass(rating)}">${ratingFixed}</div>
          <h3 class="movie-card__title">${movieName}</h3>
        </div>
        <div class="movie-card__media">
          <img alt="${movieName}" class="movie-card__poster">
          <div class="movie-card__gradient" aria-hidden="true"></div>
        </div>
      `;
        if (posterUrl) {
            li.querySelector('.movie-card__poster').src = posterUrl;
        }
        movieList.appendChild(li);
        li.addEventListener('click', () => {
            fetchMovieid(movie.id);
        });
    });
}

async function searchForm(onSearchResult) {
    const search__form = document.querySelector('.search__form');
    if (!search__form) return;
    search__form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchInput = search__form.querySelector('.search__input');
        const searchQuery = searchInput.value.trim();
        if(!searchQuery) return;

        try {
            const data = await fetchMovies(`${API_SEARCH_URL}${encodeURIComponent(searchQuery)}`);
            if(!data.docs?.length) {
                alert('ничего не найдено');
                searchInput.value = '';
                return;
            }
            searchInput.value = '';
            await onSearchResult(data);

        } catch (error) {
            console.error('Ошибка поиска:', error);
            alert('Не удалось выполнить поиск. Попробуйте позже');
        }
    });
}

export { showMovies, searchForm, getRatingClass }
