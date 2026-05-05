import { useState } from 'react'
import { registerUser } from '../services/api'

export default function Register({ onSwitch }) {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
        await registerUser(form)
        setSuccess('¡Cuenta creada! Ya podés iniciar sesión.')
        } catch (err) {
        setError(err.response?.data?.error || 'Error al registrarse')
        }
    }

    return (
        <div style={styles.card}>
        <h2 style={styles.title}>Crear cuenta</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
            <input style={styles.input} type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input style={styles.input} type="password" placeholder="Contraseña" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            <button style={styles.button} type="submit">Registrarse</button>
        </form>
        <p style={styles.switch}>¿Ya tenés cuenta? <span style={styles.link} onClick={onSwitch}>Iniciá sesión</span></p>
        </div>
    )
}

const styles = {
    card: { background: 'white', padding: '2rem', borderRadius: '12px', width: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
    title: { marginBottom: '1.5rem', color: '#1e3a5f', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    input: { padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', outline: 'none' },
    button: { padding: '0.75rem', background: '#2E86AB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
    error: { color: '#e74c3c', fontSize: '0.85rem', margin: 0 },
    success: { color: '#27ae60', fontSize: '0.85rem', margin: 0 },
    switch: { textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#666' },
    link: { color: '#2E86AB', cursor: 'pointer', fontWeight: 'bold' }
}