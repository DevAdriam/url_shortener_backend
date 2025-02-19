"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Responser;
function Responser({ status, message, data, }) {
    return {
        _succes: status >= 200 && status < 300 ? true : false,
        _data: data,
        _message: message,
        _metadata: {
            timeStamp: new Date().toISOString(),
            version: process.env.API_VERSION || "v1",
        },
    };
}
