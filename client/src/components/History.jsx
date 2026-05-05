import { deleteSearch } from '../services/api'

export default function History({ searches, onDelete }) {
    if (searches.length === 0) return (
        <p style={styles.empty}>Tu historial de búsquedas aparecerá acá.</p>
    )

    const handleDelete = async (id) => {
        try {
        await deleteSearch(id)
        onDelete(id)
        } catch (error) {
        console.error('Error al eliminar:', error)
        }
    }

    return (
        <div style={styles.container}>
        <h3 style={styles.title}>Búsquedas recientes</h3>
        <div style={styles.list}>
            {searches.map((s) => (
            <div key={s._id} style={styles.item}>
                <div style={styles.info}>
                <img src={`https://openweathermap.org/img/wn/${s.icon}.png`} alt={s.condition} style={styles.icon} />
                <div>
                    <span style={styles.city}>{s.city}, {s.country}</span>
                    <span style={styles.detail}>{s.temperature}°C · {s.condition}</span>
                </div>
                </div>
                <button style={styles.deleteBtn} onClick={() => handleDelete(s._id)}>✕</button>
            </div>
            ))}
        </div>
        </div>
    )
}

const styles = {
    container: { marginTop: '2rem' },
    title: { color: '#1e3a5f', marginBottom: '0.75rem' },
    list: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderRadius: '10px', padding: '0.75rem 1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    info: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    icon: { width: '36px', height: '36px' },
    city: { display: 'block', fontWeight: 'bold', color: '#1e3a5f', fontSize: '0.95rem' },
    detail: { display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'capitalize' },
    deleteBtn: { background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '1rem', padding: '0.25rem 0.5rem', borderRadius: '6px' },
    empty: { color: '#999', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }
}