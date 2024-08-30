import { Router, Request, Response } from 'express';
import CityList from '../models/CityList';

const router = Router();

// Добавление нового города в список
router.post('/cities', async (req: Request, res: Response) => {
    try {
        const { userId, name, country, yearFounded } = req.body;

        // Поиск или создание списка городов для пользователя
        let cityList = await CityList.findOne({ userId });

        if (!cityList) {
            cityList = new CityList({ userId, name: 'Default List' }); // Название списка можно изменить
            console.log('Created new city list for user:', userId);
        }

        // Добавление нового города в список
        cityList.cities.push({ name, country, yearFounded });

        await cityList.save();
        res.status(201).json(cityList);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка добавления города' });
    }
});

// Получение всех городов для пользователя
router.get('/cities/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const cityList = await CityList.findOne({ userId });

        if (!cityList) {
            return res.status(404).json({ error: 'Список городов не найден' });
        }

        res.status(200).json(cityList.cities);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка получения списка городов' });
    }
});

// Обновление города по имени
router.put('/cities/:userId/:cityName', async (req: Request, res: Response) => {
    const { userId, cityName } = req.params;
    const { name, country, yearFounded } = req.body;

    try {
        // Найти список городов по userId
        const cityList = await CityList.findOne({ userId });

        if (!cityList) {
            return res.status(404).json({ error: 'Список городов не найден' });
        }

        // Найти город по имени в массиве cities
        let cityFound = false;
        for (const city of cityList.cities) {
            if (city.name === cityName) {
                // Обновление данных города
                city.name = name;
                city.country = country;
                city.yearFounded = yearFounded;
                cityFound = true;
                break;
            }
        }

        if (!cityFound) {
            return res.status(404).json({ error: 'Город не найден' });
        }

        // Сохранение обновленного списка городов
        await cityList.save();
        res.status(200).json(cityList);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка обновления города' });
    }
});

// Удаление города по имени
router.delete('/cities/:userId/:cityName', async (req: Request, res: Response) => {
    const { userId, cityName } = req.params;

    try {
        const cityList = await CityList.findOne({ userId });

        if (!cityList) {
            return res.status(404).json({ error: 'Список городов не найден' });
        }

        // Найти и удалить город по имени в массиве cities
        let cityFound = false;
        for (let i = 0; i < cityList.cities.length; i++) {
            if (cityList.cities[i].name === cityName) {
                cityList.cities.splice(i, 1);
                cityFound = true;
                break;
            }
        }

        if (!cityFound) {
            return res.status(404).json({ error: 'Город не найден' });
        }

        // Сохранение обновленного списка городов
        await cityList.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Ошибка удаления города' });
    }
});

// Создание нового списка городов
router.post('/', async (req: Request, res: Response) => {
    try {
        const { userId, name, cities } = req.body;
        const cityList = new CityList({ userId, name, cities });
        await cityList.save();
        res.status(201).json(cityList);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка создания списка городов' });
    }
});

// Получение всех списков городов для пользователя
router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const cityLists = await CityList.find({ userId });
        res.status(200).json(cityLists);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка получения списков городов' });
    }
});

// Обновление списка городов
router.put('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Обновление всех списков городов для пользователя
        const updatedCityLists = await CityList.updateMany({ userId }, updates, { new: true });
        res.status(200).json(updatedCityLists);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка редактирования списков городов' });
    }
});

// Удаление списка городов
router.delete('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await CityList.deleteMany({ userId });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Ошибка удаления списков городов' });
    }
});

export default router;
