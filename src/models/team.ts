import mongoose, { Schema, Document} from 'mongoose';
import User, { IUser } from './user';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const teamSchema = new Schema({
    name: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
});

//Interfaz para tratar respuesta como documento
export interface ITeam extends Document {
    name: string;
    users: IUser['_id']; //Relacion con la coleccion users
}

//Exportamos modelo para poder usarlo
export default mongoose.model<ITeam>('Team', teamSchema);