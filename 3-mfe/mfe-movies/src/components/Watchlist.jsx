import "./Watchlist.css";
import { useMovieStore } from "../store/movie-store.js";


const Watchlist = () => {
    //З useMovieStore ініціалізуємо actions для роботи з списком збережених фільмів до перегляду
    const watchlist = useMovieStore((state) => state.watchlist);
    const clearWatchList = useMovieStore((state) => state.clearWatchList);
    const removeFromWatchList = useMovieStore((state) => state.removeFromWatchList);

    return (
        <aside className="watchlist">
            <div className="watchlist-header">
                <h2>Watchlist</h2>
                <span className="movie-count">{watchlist.length} movies</span>
            </div>

            <div className="watchlist-content">
                {watchlist?.map((movie) => (
                    <div key={movie.id} className="watchlist-item">
                        <h4>{movie.title}</h4>
                        <button className="remove-button" onClick={() => removeFromWatchList(movie.id)}>
                            Remove
                        </button>
                    </div>
                ))}

                {watchlist.length === 0 && (
                    <div className="empty-watchlist">
                        <p>Your watchlist is empty</p>
                        <p className="subtitle">Add movies to keep track of what you want to watch</p>
                    </div>
                )}
            </div>

            {watchlist.length > 0 && (
                <button className="clear-watchlist" onClick={clearWatchList}>
                    Clear Watchlist
                </button>
            )}
        </aside>
    );
};

export default Watchlist;