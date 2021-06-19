import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const ClockSchema = new Schema({
    workerID: {
        type: String
    },
    entryDate: {
        type: String
    },
    entryTime: {
        type: String
    },
    exitDate: {
        type: String
    },
    exitTime: {
        type: String
    },
    company: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IClock extends Document {
    workerID: string;
    entryDate: string;
    entryTime: string;
    exitDate: string;
    exitTime: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IClock>('clock', ClockSchema);