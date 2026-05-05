const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }))
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/weather', require('./routes/weather.routes'))

app.get('/', (req, res) => {
    res.json({ message: '🌦️ Weather Dashboard API funcionando' })
})

const PORT = process.env.PORT || 4000

const start = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    })
}

start()