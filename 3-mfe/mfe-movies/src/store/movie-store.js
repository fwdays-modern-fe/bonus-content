import { create } from 'zustand'

//Створюємо store slice для збереження стейту фільмів
const createMovieListSlice = (set) => ({
    movies: [],

    //Action для завантаження фільмів з API
    fetch: async () => {
        const { results } = await tmdb();
        set({ movies: results })
    }
})

//Створюємо store slice для збереження списку збережених до перегляду фільмів
const createWatchListSlice = (set, get) => ({
    watchlist: [],

    //Actions для додавання, видаалення, очишення та перевірки на наявність списку збережених до перегляду фільмів
    addToWatchList: (movie) => set((state) => ({ watchlist: [...state.watchlist, movie] })),
    removeFromWatchList: (id) => set((state) => ({ watchlist: [...state.watchlist].filter((movie) => movie.id !== id) })),
    clearWatchList: () => set(() => ({ watchlist: [] })),
    isInWatchlist: (id) => get().watchlist.some((movie) => movie.id === id),
})

//Об'єднання store slices до єдиного, глобального movie store
export const useMovieStore = create((...a) => ({
    ...createMovieListSlice(...a),
    ...createWatchListSlice(...a),
}))

//Функція хелпер для завантаження даних про популярні фільми з themoviedb
async function tmdb() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
