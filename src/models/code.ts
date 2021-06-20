import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const CodeSchema = new Schema({
    company: {
        type: String
    },
    date: {
        type: String
    },
    code: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface ICode extends Document {
    company: string;
    date: string;
    code: string;
    
}

//Exportamos modelo para poder usarlo
export default mongoose.model<ICode>('code', CodeSchema);