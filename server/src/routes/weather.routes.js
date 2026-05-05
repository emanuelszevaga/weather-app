const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth.middleware')
const { getWeather, getHistory, deleteSearch } = require('../controllers/weather.controller')

router.use(verifyToken)

router.get('/', getWeather)
router.get('/history', getHistory)
router.delete('/history/:id', deleteSearch)

module.exports = router