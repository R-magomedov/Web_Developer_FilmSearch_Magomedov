const API_LIST_MOVIES = 'https://api.poiskkino.dev/v1.5/movie?type=movie&notNullFields=name,rating.kp,poster.url&limit=45';
const API_LIST_SERIES = 'https://api.poiskkino.dev/v1.5/movie?type=tv-series&notNullFields=name,rating.kp,poster.url&limit=45';

function buildApi({ genre, rating, year, country } = {} ) {
    let url = API_LIST_MOVIES;
    if (genre) {
        url = `${url}&genres.name=${genre}`;
    }
    if (rating) {
        url = `${url}&rating.kp=${rating}`;
    }
    if (year) {
        url = `${url}&year=${year}`;
    }
    if (country) {
        url = `${url}&countries.name=${country}`;
    }
    return url;
}

export { API_LIST, buildApi }