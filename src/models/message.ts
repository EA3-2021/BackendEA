import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const MessageSchema = new Schema({
    description: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IMessage extends Document {
    description: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IMessage>('message', MessageSchema);