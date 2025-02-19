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
exports.URLRepository = void 0;
const database_service_1 = __importDefault(require("../common/services/database.service"));
class URLRepository {
    findURLById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_service_1.default.url.findFirst({ where: { id } });
        });
    }
    findURLByShortenURL(shortenURL) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_service_1.default.url.findFirst({ where: { shortenURL } });
        });
    }
    findURLByOriginalURL(originalURL) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_service_1.default.url.findFirst({ where: { originalURL } });
        });
    }
    save(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_service_1.default.url.create({
                data: { originalURL: dto.originalURL, shortenURL: dto.shortenURL },
            });
        });
    }
}
exports.URLRepository = URLRepository;
