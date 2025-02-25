import './App.css';
import { useState } from 'react';
import { TodoAppSignals } from "./TodoSignals.jsx";
import { TodoAppHooks } from "./TodoHooks.jsx";


const App = () => {
    const [showSignals, setShowSignals] = useState(false);

    return (
        <div className="container">
            <button
                className="toggle-button"
                onClick={() => setShowSignals(!showSignals)}
            >
                Switch to {showSignals ? 'React Hooks' : 'Preact Signals'} Implementation
            </button>

            <div className="apps-container">
                {showSignals ? <TodoAppSignals /> : <TodoAppHooks />}
            </div>
        </div>
    );
};

export default App;