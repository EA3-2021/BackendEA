import mongoose, { Schema, Document} from 'mongoose';

const TareaSchema = new Schema({
    descripcion: {
        type: String
    },
    fecha: {
        type: String
    },
    hora: {
        type: String
    },
    duracion: {
        type: String
    }
});

export interface ITarea extends Document {
    descripcion: string;
    fecha: string;
    hora: string;
    duracion: string;
}

export default mongoose.model<ITarea>('tarea', TareaSchema);