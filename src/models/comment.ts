import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const CommentSchema = new Schema({
    company: {
        type: String
    },
    workerID: {
        type: String
    },
    content: {
        type: String
    },
    state: {
        type: Boolean
    }
});

//Interfaz para tratar respuesta como documento
export interface IComment extends Document {
    company: string;
    workerID: string;
    content: string;
    state: boolean;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IComment>('comment', CommentSchema);