import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const ChatSchema = new Schema({
    name: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IChat extends Document {
    name: string;

}

//Exportamos modelo para poder usarlo
export default mongoose.model<IChat>('chat', ChatSchema);