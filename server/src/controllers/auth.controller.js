const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    try {
        const { email, password } = req.body

        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(400).json({ error: 'El email ya está registrado' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword })

        res.status(201).json({
            message: 'Usuario creado',
            user: { id: user._id, email: user.email }
        })
    } catch (error) {
        console.error('ERROR REGISTER:', error)
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('1. Buscando usuario:', email)
        
        const user = await User.findOne({ email })
        console.log('2. Usuario encontrado:', user)
        
        if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        console.log('3. Comparando contraseña')
        const validPassword = await bcrypt.compare(password, user.password)
        console.log('4. Contraseña válida:', validPassword)
        
        if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
        )

        res.json({ message: 'Login exitoso', token })
    } catch (error) {
        console.error('ERROR LOGIN:', error)
        res.status(500).json({ error: error.message })
    }
}


module.exports = { register, login }