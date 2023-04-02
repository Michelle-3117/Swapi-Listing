"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_config_1 = __importDefault(require("./db/database.config"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const movieRoute_1 = __importDefault(require("./routes/movieRoute"));
const characterRoute_1 = __importDefault(require("./routes/characterRoute"));
// var usersRouter = require('./routes/users');
const app = (0, express_1.default)();
app.use("/api", commentRoute_1.default);
app.use("/movie", movieRoute_1.default);
app.use("/people", characterRoute_1.default);
//swagger api documentation
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const swaggerDocs = yamljs_1.default.load("./documentation.yaml");
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
database_config_1.default.sync()
    .then(() => {
    // eslint-disable-next-line no-console
    console.log("Database connected successfully");
})
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.default = app;
