"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("./config/logger/winston"));
const logger_1 = __importDefault(require("./common/middlewares/logger"));
const database_service_1 = require("./common/services/database.service");
const main_route_1 = __importDefault(require("./routes/main.route"));
const cors_1 = __importDefault(require("cors"));
const url_route_1 = require("./routes/url.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
app.use(`/api/${process.env.API_VERSION || "v1"}`, main_route_1.default);
app.get("/", (_, res) => {
    res.status(200).send("hello world");
});
app.get("/:shortenURL", (req, res) => {
    url_route_1.urlController.getOriginalURL(req, res);
});
(0, database_service_1.verifyConnection)();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    winston_1.default.info(`Server is running on port ${PORT}`);
});
exports.default = app;
