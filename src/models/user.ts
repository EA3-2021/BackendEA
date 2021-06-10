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
    
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IUser>('user', UserSchema);