import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const ClockSchema = new Schema({
    clockIn: {
        type: String
    },
    latitudeIn: {               //o pongo directamente location?
        type: String
    },
    longitudeIn : {
        type: String
    },
    clockOut: {
        type: String
    },
    latitudeOut: {
        type: String
    },
    longitudeOut: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IClock extends Document {
    clockIn: string;
    clockOut: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IClock>('clock', ClockSchema);