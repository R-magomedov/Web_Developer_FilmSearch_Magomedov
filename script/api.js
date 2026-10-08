const API_KEY = 'Q9PXRVW-TE4MJ16-M78RYAV-SEQ2P3C';
const API_MOVIE_ID =
    'https://api.poiskkino.dev/v1.5/movie/';

// Выполняет запрос к API и возвращает разобранный JSON-ответ.
async function fetchMovies(url) {
    
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`)
        }
        return response.json();   

};

// Загружает данные выбранного фильма и открывает страницу с подробностями.
async function fetchMovieid(id) {
    try {
        const url = `${API_MOVIE_ID}${id}`;
        const dataID = await fetchMovies(url);
        localStorage.setItem('currentMovie', JSON.stringify(dataID));
         // Определяем путь в зависимости от текущей страницы
         const currentPath = window.location.pathname;
         const moviePath = currentPath.includes('/movie_list') || currentPath.includes('/series_list')
             ? '../movie/index.html'
             : './movie/index.html';
         
         window.open(moviePath);
         return dataID;
    } catch (error) {
        console.error('Не удалось загрузить фильм:', error);
    }
}

export { API_KEY, fetchMovies, fetchMovieid, API_MOVIE_ID }
