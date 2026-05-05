const axios = require('axios')
const Search = require('../models/Search')

const getWeather = async (req, res) => {
    try {
        const { city } = req.query

        if (!city) {
            return res.status(400).json({ error: 'El nombre de la ciudad es requerido' })
        }

        // Llamada a la API externa
        const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather', {
            params: {
            q: city,
            appid: process.env.OPENWEATHER_API_KEY,
            units: 'metric',
            lang: 'es'
            }
        }
        )

        const data = response.data
        const weatherData = {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            icon: data.weather[0].icon
        }

        // Guardar en MongoDB
        await Search.create({
            userId: req.user.id,
            ...weatherData
        })

        res.json(weatherData)
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'Ciudad no encontrada' })
        }
        res.status(500).json({ error: 'Error interno del servidor' })
    }
    }

    const getHistory = async (req, res) => {
    try {
        const searches = await Search.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .limit(10)

        res.json(searches)
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    }

    const deleteSearch = async (req, res) => {
    try {
        const search = await Search.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })

        if (!search) {
            return res.status(404).json({ error: 'Búsqueda no encontrada' })
        }

        res.json({ message: 'Búsqueda eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

module.exports = { getWeather, getHistory, deleteSearch }