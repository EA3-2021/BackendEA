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
const faq_routes_1 = __importDefault(require("./routes/faq.routes"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const clock_routes_1 = __importDefault(require("./routes/clock.routes"));
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
app.use('/faq', faq_routes_1.default);
app.use('/location', location_routes_1.default);
app.use('/comment', comment_routes_1.default);
app.use('/chat', chat_routes_1.default);
app.use('/message', message_routes_1.default);
app.use('/clock', clock_routes_1.default);
//Exportamos fichero como 'app'
exports.default = app;
