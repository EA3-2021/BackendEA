import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const ConfigurationSchema = new Schema({
    company: {
        type: String
    },
    workerID: {
        type: String
    },
    notification: {
        type: Boolean
    },
    private: {
        type: Boolean
    },
    authentication: {
        type: Boolean
    },
    location: {
        type: Boolean
    }
});

//Interfaz para tratar respuesta como documento
export interface IConfiguration extends Document {
    company: string;
    workerID: string;
    notification: boolean;
    private: boolean;
    authentication: boolean;
    location: boolean;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IConfiguration>('configuration', ConfigurationSchema);