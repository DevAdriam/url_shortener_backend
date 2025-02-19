"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLController = void 0;
const responser_1 = __importDefault(require("../utils/responser"));
const winston_1 = __importDefault(require("../config/logger/winston"));
class URLController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    createShortenURL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.body;
            try {
                if (!url) {
                    return res.status(400).json((0, responser_1.default)({
                        status: 400,
                        data: null,
                        message: "URL body is required",
                    }));
                }
                const createdURL = yield this.urlService.saveURL(url);
                return res.status(201).json((0, responser_1.default)({
                    data: Object.assign(Object.assign({}, createdURL), { shortenURL: `https://${req.hostname}/${createdURL.shortenURL}` }),
                    message: "Successfully created shorten URL",
                    status: 201,
                }));
            }
            catch (error) {
                winston_1.default.error(error);
                return res.status(500).json((0, responser_1.default)({
                    data: null,
                    message: "Something went wrong",
                    status: 500,
                }));
            }
        });
    }
    getOriginalURL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { shortenURL } = req.params;
                if (!shortenURL) {
                    return res.status(400).json((0, responser_1.default)({
                        status: 400,
                        data: null,
                        message: "Shorten URL is required",
                    }));
                }
                const foundURL = yield this.urlService.getOriginalURL(shortenURL);
                if (!foundURL) {
                    return res.status(400).json((0, responser_1.default)({
                        status: 400,
                        data: null,
                        message: "URL not found",
                    }));
                }
                res.redirect(301, `${foundURL.originalURL.toString().trimEnd()}`);
            }
            catch (error) {
                winston_1.default.error(error);
                return res.status(500).json((0, responser_1.default)({
                    data: null,
                    message: "Something went wrong",
                    status: 500,
                }));
            }
        });
    }
}
exports.URLController = URLController;
