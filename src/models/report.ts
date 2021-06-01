import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const ReportSchema = new Schema({
    affair: {
        type: String
    },
    description: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IReport extends Document {
    affair: string;
    description: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IReport>('report', ReportSchema);