import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const ConfigurationSchema = new Schema({
    notification: {
        type: Boolean
    },
    private: {
        type: Boolean
    },
    authentication: {
        type: Boolean
    },
});

//Interfaz para tratar respuesta como documento
export interface IConfiguration extends Document {
    notification: boolean;
    private: boolean;
    authentication: boolean;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<IConfiguration>('configuration', ConfigurationSchema);