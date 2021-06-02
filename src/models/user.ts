import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const UserSchema = new Schema({
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
    insignias: {
        type: Array
    }
});

//Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    insignias: Array<String>;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IUser>('user', UserSchema);