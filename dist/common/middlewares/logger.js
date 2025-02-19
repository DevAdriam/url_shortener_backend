"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("../../config/logger/winston"));
const logRequests = (req, res, next) => {
    winston_1.default.info(`${req.method} ${req.url}`);
    next();
};
exports.default = logRequests;
