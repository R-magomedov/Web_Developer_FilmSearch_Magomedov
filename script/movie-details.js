import { initSlider } from "../script/slider.js";
import { API_MOVIE_ID, fetchMovies } from "./api.js";
import { getRatingClass, searchForm } from "./render-cards.js";

let currentMovieId = null;
let lastMovieRequestId = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные фильма из localStorage
    const movieData = localStorage.getItem('currentMovie');

    if (!movieData) {
        alert('Данные фильма не найдены');
        return;
    }

    try {
        const movie = JSON.parse(movieData);
        updateMovieDetails(movie);
        // localStorage.removeItem('currentMovie');

    } catch (error) {
        console.error('Повреждённые данные фильма:', error);
        alert('Не удалось отобразить фильм');
    }
});

searchForm(async (data) => {
    const movieID = data.docs[0]?.id;
    if (!movieID) return;
    const requestId = ++lastMovieRequestId;

    try {
        const url = `${API_MOVIE_ID}${movieID}`;
        const fullMovie = await fetchMovies(url);
        if (requestId !== lastMovieRequestId) return;

        document.querySelector('.movie-details')?.scrollIntoView({ behavior: 'smooth' });
        updateMovieDetails(fullMovie);
    } catch (error) {
        console.error('Ошибка при открытии фильма:', error);
        alert('Не удалось открыть фильм. Попробуйте позже');
    }
})

async function getMovieShots(movieId) {

    const section = document.querySelector('.movie-shots');
    document.querySelector('.movie-shots__list').innerHTML = '';
    section.style.display = '';
    try {
        const data = await fetchMovies(`https://api.poiskkino.dev/v1.5/image?movieId=${movieId}&notNullFields=url&limit=10&withCount=false`);
        if (movieId !== currentMovieId) return;

        if (data.docs && data.docs.length > 0) {
            showShots(data.docs);
            initSlider(section, 20);
        } else {
            section.style.display = 'none';
        }

    } catch (error) {
        if (movieId !== currentMovieId) return;

        console.error('Ошибка загрузки кадров:', error);
        section.style.display = 'none';
    }
}

async function getMovieReviews(movieID) {
    document.querySelector('.reviews-list').innerHTML = '';
    document.querySelector('.movie-reviews').style.display = '';
    try {
        const data = await fetchMovies(`https://api.poiskkino.dev/v1.5/review?movieId=${movieID}&limit=2&withCount=false`);
        if (movieID !== currentMovieId) return;

        if (data.docs.length > 0) {
            showReviews(data.docs)
        } else {
            document.querySelector('.movie-reviews').style.display = 'none';
        }

    } catch (error) {
        if (movieID !== currentMovieId) return;

        console.error('Ошибка при загрузке отзывов:', error);
        document.querySelector('.movie-reviews').style.display = 'none';
    }

}

function showReviews(data) {
    const reviewsList = document.querySelector('.reviews-list')


    data.forEach(review => {
        const li = document.createElement('li')
        li.className = 'reviews-item'
        li.innerHTML = `
                    <h3 class="reviews-item__author"></h3>
                    <div class="rating">
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--filled" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--empty" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                        <svg class="rating__star rating__star--empty" viewBox="0 0 25 24" fill="currentColor"
                            aria-label="Звезда для рейтинга">
                            <path
                                d="M12.1224 19.4048L18.0015 22.9606C19.0782 23.6123 20.3957 22.649 20.1124 21.4306L18.554 14.744L23.7532 10.239C24.7024 9.41729 24.1924 7.85896 22.9457 7.75979L16.1032 7.17896L13.4257 0.860625C12.944 -0.286875 11.3007 -0.286875 10.819 0.860625L8.14152 7.16479L1.29902 7.74563C0.0523565 7.84479 -0.457644 9.40312 0.491523 10.2248L5.69069 14.7298L4.13236 21.4165C3.84902 22.6348 5.16652 23.5981 6.24319 22.9465L12.1224 19.4048Z" />
                        </svg>
                    </div>
                    <p class="reviews-item__text"></p>
        `;
        li.querySelector('.reviews-item__author').textContent = review.author || 'Аноним';
        li.querySelector('.reviews-item__text').textContent = review.review || 'Нет текста';
        reviewsList.appendChild(li)
    })
}

function showShots(movie) {
    const movieShotsList = document.querySelector('.movie-shots__list');

    movie.forEach(mov => {
        const movieShotsItem = document.createElement('li');
        movieShotsItem.className = ('movie-shots__item');
        const imgSrc = mov.url || mov.previewUrl || '../assets/Images/movie-poster-1.png';

        movieShotsItem.innerHTML = `
        <img src="${imgSrc}"
        alt="Кадр из фильма"
        class="movie-shots__poster">
    `;
        movieShotsList.appendChild(movieShotsItem);
    });


}

function updateMovieDetails(movie) {
    currentMovieId = movie.id;

    // Обновляем заголовок
    document.querySelector('.movie-details__title').textContent = movie.name || 'Название не указано';

    // Обновляем рейтинг
    const rating = movie.rating?.kp ?? movie.rating?.imdb;
    const ratingClass = getRatingClass(rating);
    document.querySelector('.movie-card__rating').textContent = typeof rating === 'number' ? rating.toFixed(1) : '—';
    document.querySelector('.movie-card__rating').className = `movie-card__rating ${ratingClass}`;

    // Обновляем постер
    const posterUrl = movie.poster?.url || '../assets/Images/about-bg.png';
    document.querySelector('.movie-card__poster').src = posterUrl;
    document.querySelector('.movie-card__poster').alt = movie.name || 'Постер фильма';

    // Обновляем информацию о фильме
    const premiere = movie.premiere?.world;
    const releaseDate = premiere ? new Date(premiere).toLocaleDateString('ru-RU') : 'Не указано';
    const movieInfo = document.querySelector('.movie-details__list');
    movieInfo.innerHTML = `
        <dt>Жанр</dt>
        <dd>${movie.genres?.map(g => g.name).join(', ') || 'Не указано'}</dd>
        <dt>Страна производства</dt>
        <dd>${movie.countries?.map(c => c.name).join(', ') || 'Не указано'}</dd>
        <dt>Актёры</dt>
        <dd>${movie.persons?.filter(p => p.enProfession === 'actor').map(p => p.name).join(', ') || 'Не указано'}</dd>
        <dt>Режиссеры</dt>
        <dd>${movie.persons?.filter(p => p.enProfession === 'director').map(p => p.name).join(', ') || 'Не указано'}</dd>
        <dt>Дата релиза</dt>
        <dd>${releaseDate}</dd>
        <dt>Возрастное ограничение</dt>
        <dd>${movie.ratingMpaa || 'Не указано'}</dd>
    `;

    // Обновляем трейлер
    document.querySelector('.movie-trailer__source').src = movie.videos?.trailers?.[0]?.url || 'https://www.youtube.com/embed/';
    document.querySelector('.movie-trailer__poster').style.backgroundImage = `url(${posterUrl})`;

    // Обновляем шотсы
    getMovieShots(movie.id);

    // Обновляем отзывы
    getMovieReviews(movie.id);

}

const videoWrapper = document.querySelector('.movie-trailer__video');
const playBtn = document.querySelector('.movie-trailer__play');

if (playBtn) {
    playBtn.addEventListener('click', () => {
        videoWrapper.classList.add('is-playing');
    });
}
