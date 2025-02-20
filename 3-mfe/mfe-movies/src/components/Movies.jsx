import "./Movies.css"
import { useMovieStore } from "../store/movie-store.js"
import { useEffect } from "react"

const Movies = () => {
    //Використовуємо useMovieStore для ініціалізації даних для рендеру та actions для роботи з застосунком
    const data = useMovieStore((state) => state.movies)
    const { isInWatchlist } = useMovieStore((state) => state)
    const removeFromWatchList = useMovieStore((state) => state.removeFromWatchList)
    const addToWatchList = useMovieStore((state) => state.addToWatchList)

    //Action для асинхронного завантаження списку популярних фільмів
    const fetch = useMovieStore((state) => state.fetch)

    //Завантажимо список фільмів в useEffect для оптимізації ре-рендерингу
    useEffect(() => {
        fetch()
    }, [fetch])

    return (
        <div className="movie-list">
            {data.map((movie) => (
                <div key={movie.id} className="card style_1">
                    <div className="image">
                        <div className="wrapper">
                            <a className="image" href={`/movie/${movie.id}`} title={movie.title}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    className="movie-poster"
                                    alt={movie.title}
                                />
                            </a>
                            <div className="score-circle">
                                {Math.round(movie.vote_average * 10)}%
                            </div>
                        </div>
                        <div className="options">
                            <a className="no_click" href="#">
                                <div className="glyphicons_v2 circle-more white"></div>
                            </a>
                        </div>
                    </div>
                    <div className="content">
                        <h2>
                            <a href={`/movie/${movie.id}`} title={movie.title}>
                                {movie.title}
                            </a>
                        </h2>
                        <p>{movie.overview}</p>
                        <div className="release-date">
                            {new Date(movie.release_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <button
                            className={`watchlist-button ${isInWatchlist(movie.id) && 'remove'}`}
                            onClick={() =>
                                isInWatchlist(movie.id)
                                    ? removeFromWatchList(movie.id)
                                    : addToWatchList(movie)
                            }
                        >
                            {isInWatchlist(movie.id) ? "Remove" : "Add to Watchlist"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Movies;