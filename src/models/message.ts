import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const MessageSchema = new Schema({
    msg: {
        type: String
    },
    createdAt: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IMessage extends Document {
    msg: string;
    createdAt: string;

}

//Exportamos modelo para poder usarlo
export default mongoose.model<IMessage>('message', MessageSchema);