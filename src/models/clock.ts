import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const ClockSchema = new Schema({
    workerID: {
        type: String
    },
    clockIn: {
        type: String
    },
    clockOut: {
        type: String
    },
    company: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IClock extends Document {
    workerID: string;
    clockIn: string;
    clockOut: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IClock>('clock', ClockSchema);