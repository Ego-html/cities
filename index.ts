import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cityListRoutes from './routes/cityList';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());

// Подключение к MongoDB (поменяй строку подключения на свою)
mongoose.connect('mongodb://localhost:27017/')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

// Подключение маршрутов
app.use('/api/city-lists', cityListRoutes);

// Простейший маршрут для проверки работы сервера
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
