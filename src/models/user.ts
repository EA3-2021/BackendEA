import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    birthdate: {
        type: String
    },
    password: {
        type: String
     }
});

//Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    name: string;
    email: string;
    birthdate: string;
    password: string;
    
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IUser>('user', UserSchema);