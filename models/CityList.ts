import mongoose, { Schema, Document } from 'mongoose';

interface ICity {
    name: string;
}

interface ICityList extends Document {
    userId: string;
    name: string;
    cities: ICity[];
}

const CitySchema: Schema = new Schema({
    name: { type: String, required: true }
});

const CityListSchema: Schema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    cities: { type: [CitySchema], default: [] }
});

export default mongoose.model<ICityList>('CityList', CityListSchema);
