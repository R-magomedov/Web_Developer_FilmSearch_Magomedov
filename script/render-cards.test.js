import { getRatingClass, showMovies } from "./render-cards";

describe ('функция, возвращает класс взависимости от полученного рейтинга',
    () => {
        const testCase = [
            {
                input: null,
                output: ''
            },
            {
                input: undefined,
                output: ''
            },
            {
                input: 0,
                output: 'movie-card__rating--low'
            },
            {
                input: 8,
                output: 'movie-card__rating--high'
            },
            {
                input: 7.5,
                output: 'movie-card__rating--high'
            },
            {
                input: 6,
                output: 'movie-card__rating--medium'
            },
            {
                input: 5,
                output: 'movie-card__rating--medium'
            },
            {
                input: 4,
                output: 'movie-card__rating--low'
            }
        ]

        testCase.forEach(test => {
            it(
                `Входные данные: ${test.input}, ожидаемый результат: ${test.output}`,
                () => {
                    const result = getRatingClass(test.input);
                    expect(result).toBe(test.output);
                }
            )
        })
    }
);

test('функция отрисовывает карточки в html, полученные по аpi', () => {

    const movies = [
        {
            name: 'Фильм 1',
            poster: { url: 'poster1.jpg' },
            rating: { kp: 8 },
            id: 1
        },
        {
            name: 'Фильм 2',
            poster: { url: 'poster2.jpg' },
            rating: { imdb: 6 },
            id: 2
        }
    ];

    document.body.innerHTML = `<ul id="ul"></ul>`;
    const ul = document.getElementById('ul');

    showMovies(movies, 'ul');
    expect(ul.children.length).toBe(2)
});

test('функция удаляет старые карточки, перед отрисовкой новых', () => {
    document.body.innerHTML = 
        `<ul id="ul">
            <li>Старая карточка 1</li>
            <li>Старая карточка 2</li>
            <li>Старая карточка 3</li>
        </ul>`;
    const ul = document.getElementById('ul');

    const movies = [
        {
            name: 'Фильм 1',
            poster: { url: 'poster1.jpg' },
            rating: { kp: 8 },
            id: 1
        },
        {
            name: 'Фильм 2',
            poster: { url: 'poster2.jpg' },
            rating: { imdb: 6 },
            id: 2
        }
    ];

    showMovies(movies, 'ul');
    expect(ul.children.length).toBe(2)

})