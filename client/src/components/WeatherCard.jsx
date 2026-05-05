export default function WeatherCard({ data }) {
    if (!data) return null

    return (
        <div style={styles.card}>
        <div style={styles.header}>
            <div>
            <h2 style={styles.city}>{data.city}, {data.country}</h2>
            <p style={styles.condition}>{data.condition}</p>
            </div>
            <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.condition} style={styles.icon} />
        </div>
        <div style={styles.stats}>
            <div style={styles.stat}>
            <span style={styles.statValue}>{data.temperature}°C</span>
            <span style={styles.statLabel}>Temperatura</span>
            </div>
            <div style={styles.stat}>
            <span style={styles.statValue}>{data.humidity}%</span>
            <span style={styles.statLabel}>Humedad</span>
            </div>
        </div>
        </div>
    )
}

const styles = {
    card: { background: 'linear-gradient(135deg, #1e3a5f, #2E86AB)', color: 'white', borderRadius: '16px', padding: '1.5rem', marginTop: '1.5rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    city: { margin: 0, fontSize: '1.5rem' },
    condition: { margin: '0.25rem 0 0', textTransform: 'capitalize', opacity: 0.85 },
    icon: { width: '80px', height: '80px' },
    stats: { display: 'flex', gap: '2rem', marginTop: '1.25rem' },
    stat: { display: 'flex', flexDirection: 'column' },
    statValue: { fontSize: '1.75rem', fontWeight: 'bold' },
    statLabel: { fontSize: '0.8rem', opacity: 0.75, marginTop: '0.25rem' }
}