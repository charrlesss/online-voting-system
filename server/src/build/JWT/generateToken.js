"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateAccessToken = function (user) {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '5m' });
};
var generateRefreshToken = function (user) {
    return jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN);
};
exports.generateRefreshToken = generateRefreshToken;
exports.default = generateAccessToken;
