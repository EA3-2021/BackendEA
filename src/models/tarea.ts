import mongoose, { Schema, Document} from 'mongoose';

const TareaSchema = new Schema({
    workerID: {
        type: String
    },
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    fecha: {
        type: String
    },
    horaI :{
        type: String
    },
    horaF: {
        type: String
    }
});

export interface ITarea extends Document {
    workerID: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    horaI: string;
    horaF: string;
}

export default mongoose.model<ITarea>('tarea', TareaSchema);



