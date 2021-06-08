"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos dependencias
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
//Importamos fichero de rutas
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const license_routes_1 = __importDefault(require("./routes/license.routes"));
<<<<<<< HEAD
const faq_routes_1 = __importDefault(require("./routes/faq.routes"));
=======
>>>>>>> 6c881eccf9b1c3e004e329a26612b0239fe4b345
//Inicializamos express
const app = express_1.default();
//Configuración
//Cuando haya variable de entorno sera PORT y sino 3000
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
//Llama a las rutas de la API
app.use('/user', user_routes_1.default);
app.use('/team', team_routes_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/admin', admin_routes_1.default);
app.use('/license', license_routes_1.default);
<<<<<<< HEAD
app.use('/faq', faq_routes_1.default);
=======
>>>>>>> 6c881eccf9b1c3e004e329a26612b0239fe4b345
//Exportamos fichero como 'app'
exports.default = app;
