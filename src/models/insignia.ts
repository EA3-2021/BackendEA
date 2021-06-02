import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const InsigniaSchema = new Schema({
    nombre: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface Iinsignia extends Document {
    nombre: string;
    
}

//Exportamos modelo para poder usarlo
export default mongoose.model<Iinsignia>('insignia', InsigniaSchema);