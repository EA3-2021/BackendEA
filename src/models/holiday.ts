import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const HolidaySchema = new Schema({
    company: {
        type: String
    },
    workerID: {
        type: String
    },
    motivo: {
        type: String
    },
    descripcion: {
        type: String
    },
    fechaI: {
        type: String
    },
    fechaF: {
        type: String
    },
    estado:{
        type: Boolean
    }
});

//Interfaz para tratar respuesta como documento
export interface IHoliday extends Document {
    company: string;
    workerID: string;
    motivo: string;
    descripcion: string;
    fechaI: string;
    fechaF: string;
    estado: boolean
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IHoliday>('holiday', HolidaySchema);


