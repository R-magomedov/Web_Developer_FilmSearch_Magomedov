const API_KEY = 'Q9PXRVW-TE4MJ16-M78RYAV-SEQ2P3C';
const API_MOVIE_ID =
    'https://api.poiskkino.dev/v1.5/movie/';

async function fetchMovies(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': API_KEY
            }
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Ошибка сети:', error);
    }

};

async function fetchMovieid(id) {
    try {
        const url = `${API_MOVIE_ID}${id}`;
        const dataID = await fetchMovies(url);
        localStorage.setItem('currentMovie', JSON.stringify(dataID));
        window.open('../movie/index.html', '_blank');
        return dataID;
    } catch (error) {
        console.error('Не удалось загрузить фильм:', error);
    }
}

export { API_KEY, fetchMovies, fetchMovieid, API_MOVIE_ID }