import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const SettingSchema = new Schema({
    name: {
        type: String
    },
    notifications: {
        type: String
    },
    privacity: {
        type: String
    },
    security: {
        type: String
     }
});

//Interfaz para tratar respuesta como documento
export interface ISetting extends Document {
    name: string;
    notifications: string;
    privacity: string;
    security: string;
}

//Exportamos modelo para poder usarlo
export default mongoose.model<ISetting>('setting', SettingSchema);