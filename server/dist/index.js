"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
/** custom imports */
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const template_js_1 = __importDefault(require("./routes/template.js"));
const token_js_1 = __importDefault(require("./routes/token.js"));
const query_js_1 = __importDefault(require("./routes/query.js"));
const category_js_1 = __importDefault(require("./routes/category.js"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/* ROUTES */
app.get('/', (req, res) => {
    res.status(200).json({ massage: 'Express + TypeScript Server' });
});
app.use('/auth', auth_js_1.default);
app.use('/token', token_js_1.default);
app.use('/query', query_js_1.default);
app.use('/template', template_js_1.default);
app.use('/category', category_js_1.default);
/* MONGOOSE SETUP */
const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.MONGO_URL);
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    /** running server */
    app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
})
    .catch((error) => console.log(`${error} did not connect`));
