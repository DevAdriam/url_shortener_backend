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
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLService = void 0;
class URLService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    saveURL(originalURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlAlreadyExists = yield this.urlRepository.findURLByOriginalURL(originalURL);
            if (!!urlAlreadyExists) {
                return urlAlreadyExists;
            }
            const shortenURL = this.generateShortUrl();
            return this.urlRepository.save({ originalURL, shortenURL });
        });
    }
    getOriginalURL(shortenURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalURL = yield this.urlRepository.findURLByShortenURL(shortenURL);
            return originalURL;
        });
    }
    generateShortUrl(length = 8) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
exports.URLService = URLService;
