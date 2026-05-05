import { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import WeatherCard from './components/WeatherCard'
import History from './components/History'
import { fetchWeather, fetchHistory } from './services/api'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
    const [showRegister, setShowRegister] = useState(false)
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const [history, setHistory] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isLoggedIn) loadHistory()
    }, [isLoggedIn])

    const loadHistory = async () => {
        try {
        const res = await fetchHistory()
        setHistory(res.data)
        } catch (err) {
        console.error('Error cargando historial:', err)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!city.trim()) return
        setError('')
        setLoading(true)
        try {
        const res = await fetchWeather(city)
        setWeather(res.data)
        loadHistory()
        } catch (err) {
        setError(err.response?.data?.error || 'Ciudad no encontrada')
        setWeather(null)
        } finally {
        setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setWeather(null)
        setHistory([])
    }

    const handleDeleteFromHistory = (id) => {
        setHistory((prev) => prev.filter((s) => s._id !== id))
    }

    if (!isLoggedIn) {
        return (
        <div style={styles.authWrapper}>
            {showRegister
            ? <Register onSwitch={() => setShowRegister(false)} />
            : <Login onLogin={() => setIsLoggedIn(true)} onSwitch={() => setShowRegister(true)} />
            }
        </div>
        )
    }

    return (
        <div style={styles.wrapper}>
        <div style={styles.container}>
            <div style={styles.topBar}>
            <h1 style={styles.appTitle}>🌦️ Weather Dashboard</h1>
            <button style={styles.logoutBtn} onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <form onSubmit={handleSearch} style={styles.searchForm}>
            <input style={styles.searchInput} type="text" placeholder="Buscá una ciudad..." value={city} onChange={(e) => setCity(e.target.value)} />
            <button style={styles.searchBtn} type="submit" disabled={loading}>
                {loading ? '...' : 'Buscar'}
            </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            <WeatherCard data={weather} />
            <History searches={history} onDelete={handleDeleteFromHistory} />
        </div>
        </div>
    )
}

const styles = {
    authWrapper: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' },
    wrapper: { minHeight: '100vh', background: '#f0f4f8', padding: '2rem 1rem' },
    container: { maxWidth: '600px', margin: '0 auto' },
    topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    appTitle: { margin: 0, color: '#1e3a5f', fontSize: '1.5rem' },
    logoutBtn: { background: 'none', border: '1px solid #ccc', borderRadius: '8px', padding: '0.4rem 0.9rem', cursor: 'pointer', color: '#666', fontSize: '0.85rem' },
    searchForm: { display: 'flex', gap: '0.75rem' },
    searchInput: { flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' },
    searchBtn: { padding: '0.75rem 1.5rem', background: '#2E86AB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
    error: { color: '#e74c3c', fontSize: '0.9rem', marginTop: '0.5rem' }
}