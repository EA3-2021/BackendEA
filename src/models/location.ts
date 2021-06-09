import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const LocationSchema = new Schema({
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface ILocation extends Document {
    latitude: string;
    longitude: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<ILocation>('location', LocationSchema);