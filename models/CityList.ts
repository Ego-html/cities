import mongoose, { Schema, Document } from 'mongoose';

// Интерфейс для города
interface ICity {
    name: string;
    country: string;
    yearFounded?: number;  // Добавлено поле для года основания
}

// Интерфейс для списка городов
interface ICityList extends Document {
    userId: string;
    name: string;
    cities: ICity[];
}

// Схема для города
const CitySchema: Schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    yearFounded: { type: Number }  // Добавлено поле для года основания
});

// Схема для списка городов
const CityListSchema: Schema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    cities: { type: [CitySchema], default: [] }
});

export default mongoose.model<ICityList>('CityList', CityListSchema);
