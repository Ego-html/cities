import { Router, Request, Response } from 'express';
import CityList from '../models/CityList';

const router = Router();

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

router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const cityLists = await CityList.find({ userId });
        res.status(200).json(cityLists);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка получения списков городов' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedCityList = await CityList.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedCityList);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка редактирования списка городов' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await CityList.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Ошибка удаления списка городов' });
    }
});

export default router;

