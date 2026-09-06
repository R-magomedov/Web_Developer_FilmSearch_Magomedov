import { fetchMovieid, fetchMovies } from "./api.js";

const API_SEARCH_URL =
    'https://api.poiskkino.dev/v1.5/movie/search?page=1&limit=10&selectFields=&notNullFields=name,rating.kp,poster.url&query=';

function showMovies(movies, ul) {
    const movieList = document.getElementById(ul);
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.className = 'movie-card';

        let getClassByRating = function (rating) {
            if (rating >= 7.5) {
                return 'movie-card__rating--high';
            } else if (rating >= 5) {
                return 'movie-card__rating--medium';
            } else {
                return 'movie-card__rating--low';
            }
        };

        let ratingfixed = movie.rating.kp ? movie.rating.kp.toFixed(1) : movie.rating.imdb.toFixed(1);


        li.innerHTML = `
        <div class="movie-card__overlay">
          <div class="movie-card__rating ${getClassByRating(ratingfixed)}">${ratingfixed}</div>
          <h3 class="movie-card__title">${movie.name}</h3>
        </div>
        <div class="movie-card__media">
          <img src="${movie.poster.url}" alt="${movie.name}" class="movie-card__poster">
          <div class="movie-card__gradient" aria-hidden="true"></div>
        </div>
      `;
        movieList.appendChild(li);
        li.addEventListener('click', () => {
            fetchMovieid(movie.id);
        });
    });
}

async function searchForm(onSearchResult) {
    const search__form = document.querySelector('.search__form');
    search__form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchInput = search__form.querySelector('.search__input');
        const searchQuery = searchInput.value;

        const searchUrl = `${API_SEARCH_URL}${encodeURIComponent(searchQuery)}`;
        const data = await fetchMovies(searchUrl);

        searchInput.value = '';

        onSearchResult(data);
    });
}



export { showMovies, searchForm }