import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const AdminSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    cif: {
        type: String
    },
    address: {
        type: String
     },
    postalCode: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
});

//Interfaz para tratar respuesta como documento
export interface IAdmin extends Document {
    name: string;
    email: string;
    cif: string;
    address: string;
    postalCode: string;
    phone: string;
    password: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IAdmin>('admin', AdminSchema);