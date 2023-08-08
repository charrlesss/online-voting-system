"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateCode = function () {
    var code = "";
    while (code.length < 5) {
        var randomNumber = Math.floor(Math.random() * 9);
        if (code.indexOf(randomNumber.toString()) === -1) {
            code = code + randomNumber;
        }
    }
    var genCode = code;
    return genCode;
};
exports.default = generateCode;
