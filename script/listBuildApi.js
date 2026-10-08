const API_LIST_MOVIES = 'https://api.poiskkino.dev/v1.5/movie?type=movie&notNullFields=name,rating.kp,poster.url&limit=45';
const API_LIST_SERIES = 'https://api.poiskkino.dev/v1.5/movie?type=tv-series&notNullFields=name,rating.kp,poster.url&limit=45';

// Собирает URL запроса для текущего каталога с выбранными фильтрами.
function buildApi({ genre, rating, year, country } = {} ) {
    const pageType = document.body.dataset.page;
    let url = pageType === 'movies' ? API_LIST_MOVIES : API_LIST_SERIES;

    if (genre) {
        url = `${url}&genres.name=${genre}`;
    }
    if (rating) {
        url = `${url}&rating.kp=${rating}-${rating}.9`;
    }
    if (year) {
        url = `${url}&year=${year}`;
    }
    if (country) {
        url = `${url}&countries.name=${country}`;
    }
    return url;
}

export { buildApi, API_LIST_MOVIES }
