# Weather Dashboard 🌦️

Aplicación web Full Stack que permite consultar el clima de cualquier ciudad en tiempo real,
con autenticación de usuarios e historial de búsquedas persistente.

## Stack

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

## Características

- Consulta del clima en tiempo real integrando la API de OpenWeatherMap
- Registro e inicio de sesión seguro con JWT y hashing de contraseñas (bcrypt)
- Historial de búsquedas por usuario persistido en MongoDB
- Arquitectura cliente-servidor desacoplada (React + REST API)
- Endpoints protegidos mediante middleware de autenticación

## Arquitectura

```
client/          → React (Vite) — interfaz de usuario
server/          → Node.js + Express — REST API
                 → MongoDB — base de datos NoSQL (local con Docker)
                 → OpenWeatherMap API — servicio externo
```

## Requisitos previos

- Node.js v18+
- Docker Desktop
- API key gratuita en OpenWeatherMap

## Instalación y uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/weather-dashboard.git
cd weather-dashboard
```

### 2. Levantar la base de datos
```bash
docker-compose up -d
```

### 3. Configurar el servidor
```bash
cd server
cp .env.example .env
# Completar los valores en .env
npm install
npm run dev
```

### 4. Configurar el cliente
```bash
cd client
cp .env.example .env
# Completar los valores en .env
npm install
npm run dev
```

El servidor corre en http://localhost:4000  
El cliente corre en http://localhost:5174

## Variables de entorno

### server/.env.example
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/weatherapp
JWT_SECRET=
OPENWEATHER_API_KEY=
```

### client/.env.example
```
VITE_API_URL=http://localhost:4000/api
```

## Endpoints

### Auth

| Método | Endpoint           | Descripción       | Auth |
|--------|--------------------|-------------------|------|
| POST   | /api/auth/register | Registrar usuario | No   |
| POST   | /api/auth/login    | Iniciar sesión    | No   |

### Weather

| Método | Endpoint                  | Descripción                        | Auth |
|--------|---------------------------|------------------------------------|------|
| GET    | /api/weather?city=:city   | Consultar clima y guardar búsqueda | Sí   |
| GET    | /api/weather/history      | Obtener historial del usuario      | Sí   |
| DELETE | /api/weather/history/:id  | Eliminar búsqueda del historial    | Sí   |

Los endpoints protegidos requieren el header:
```
Authorization: Bearer <token>
```

## Orden de arranque

1. Abrir Docker Desktop y esperar que esté listo
2. `docker-compose up -d` desde la raíz
3. `npm run dev` dentro de `server`
4. `npm run dev` dentro de `client`

## Estructura del proyecto

```
weather-dashboard/
├── client/
│   └── src/
│       ├── components/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── WeatherCard.jsx
│       │   └── History.jsx
│       ├── services/
│       │   └── api.js
│       └── App.jsx
│
├── server/
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── weather.controller.js
│       ├── middlewares/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── User.js
│       │   └── Search.js
│       └── routes/
│           ├── auth.routes.js
│           └── weather.routes.js
│
└── docker-compose.yml
```