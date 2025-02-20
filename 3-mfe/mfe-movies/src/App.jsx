import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import "./App.css";

function App() {
    return (
        <div className="app">
            <h1 className="main-title">Top rated movies</h1>
            <div className="content-wrapper">
                <div className="movies-section">
                    <Movies />
                </div>
                <div className="watchlist-section">
                    <Watchlist />
                </div>
            </div>
        </div>
    );
}

export default App;
