import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
const LicenseSchema = new Schema({
    licenseCode: {
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface ILicense extends Document {
    licenseCode: string;
    
}

//Exportamos modelo para poder usarlo
export default mongoose.model<ILicense>('license', LicenseSchema);