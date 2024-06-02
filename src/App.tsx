import './App.css'
import './css'
import { useTheme } from './components/Theme'

function App() {
    const [theme, toggleTheme] = useTheme();

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={toggleTheme}>
                    theme is {theme}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
