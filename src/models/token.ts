import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const TokenSchema = new Schema({
    workerID: {
        type: String
    },
    patata: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IToken extends Document {
    workerID: string;
    patata: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IToken>('token', TokenSchema);