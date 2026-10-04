import { API_LIST_MOVIES, buildApi } from "./listBuildApi";


describe('функция buildApi, формирует корректный URL с фильтрами', () => {

    beforeEach(() => {
        document.body.dataset.page = 'movies';
    });

    it('возвращает базовый URL без фильтров', () => {
        const url = buildApi();
        expect(url).toBe(API_LIST_MOVIES);
    });

    it('добавляет жанр', () => {
        const url = buildApi({ genre: 'комедия' })
        expect(url).toContain('&genres.name=комедия')
    });

    it('добавляет несколько фильтров одновременно', () => {
        const url = buildApi({
            genre: 'комедия',
            year: '2010'
        });
        expect(url).toContain('&genres.name=комедия');
        expect(url).toContain('&year=2010');
    });

    it('игогорирует пустые значения', () => {
        const url = buildApi({genre: '', year: 2010});
        expect(url).not.toContain('genres.name');
        expect(url).toContain('&year=2010');
    })
});