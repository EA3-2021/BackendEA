import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const UserSchema = new Schema({
    company: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    workerID: {
        type: String
    },
    petition: {
        type: Boolean
    },
    insignias: {
        type: Array
    },
    token: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    company: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    workerID: string;
    petition: boolean;
    insignias: Array<String>;
    token: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IUser>('user', UserSchema);