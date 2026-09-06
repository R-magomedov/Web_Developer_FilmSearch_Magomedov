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

// async function getMovieShots(movieId) {
//     const url = `${API_URL_IMAGE}${movieId}&notNullFields=url&limit=10&withCount=false`;
//     try {
//         const response = await fetch(url, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'X-API-KEY': API_KEY
//             }
//         });
//         const data = await response.json();

//         if (data.docs && data.docs.length > 0) {
//             showShots(data.docs);
//         }

//         initSlider(document.querySelector('.movie-shots'), 20);

//     } catch (error) {
//         console.error('Ошибка сети:', error);
//     }
// }