import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const CommentSchema = new Schema({
    content: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IComment extends Document {
    content: string;

}

//Exportamos modelo para poder usarlo
export default mongoose.model<IComment>('comment', CommentSchema);