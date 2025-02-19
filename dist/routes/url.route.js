"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlController = void 0;
const express_1 = require("express");
const url_controller_1 = require("../controllers/url.controller");
const url_service_1 = require("../services/url.service");
const url_repository_1 = require("../repositories/url.repository");
const urlRouter = (0, express_1.Router)();
const urlRepository = new url_repository_1.URLRepository();
const urlService = new url_service_1.URLService(urlRepository);
exports.urlController = new url_controller_1.URLController(urlService);
urlRouter.post("/", (req, res) => {
    exports.urlController.createShortenURL(req, res);
});
exports.default = urlRouter;
