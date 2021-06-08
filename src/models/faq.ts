import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const FaqSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IFaq extends Document {
    title: string;
    content: string; 
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IFaq>('faq', FaqSchema);