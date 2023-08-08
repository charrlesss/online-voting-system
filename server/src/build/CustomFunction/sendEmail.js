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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessagesForVoted = exports.verifyAccountToVotedSuccess = exports.verifyAccountToVotedWaiting = exports.verifyAccountFromEmail = exports.feedbackFromEmail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
function feedbackFromEmail(user) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, mailOptions;
        return __generator(this, function (_a) {
            transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                secure: false,
                auth: {
                    user: process.env.SYSTEM_USERNAME,
                    pass: process.env.SYSTEM_SECRET,
                },
            });
            mailOptions = {
                from: "andrecoso09@gmail.com",
                to: "andrecoso09@gmail.com",
                subject: "Online Voting System",
                text: "Content-type:application/json",
                html: "\n          <h3>Hi Online Voting System from ".concat(user.email, "</h3>\n           <p>\n            This message is from ").concat(user.fullname, " ").concat(user.message, "\n           </p>\n    \n       "),
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.feedbackFromEmail = feedbackFromEmail;
function verifyAccountFromEmail(email, code) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, mailOptions;
        return __generator(this, function (_a) {
            transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                secure: false,
                auth: {
                    user: "".concat(process.env.SYSTEM_USERNAME),
                    pass: "".concat(process.env.SYSTEM_SECRET),
                },
            });
            mailOptions = {
                from: "andrecoso09@gmail.com",
                to: "".concat(email),
                subject: "Online Voting System",
                text: "Content-type:application/json",
                html: "\n           <p>\n           Hi ".concat(email, "! , ").concat(code, " This code is for verify your account in online voting system.\n           </p>\n       "),
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.verifyAccountFromEmail = verifyAccountFromEmail;
function verifyAccountToVotedWaiting(email, messages) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, mailOptions;
        return __generator(this, function (_a) {
            transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                secure: false,
                auth: {
                    user: process.env.SYSTEM_USERNAME,
                    pass: process.env.SYSTEM_SECRET,
                },
            });
            mailOptions = {
                from: "andrecoso09@gmail.com",
                to: "".concat(email),
                subject: "Online Voting System",
                text: "Content-type:application/json",
                html: "\n           <h3>\n           Hi ".concat(email, " this is from Online Voting System\n           </h3>\n           <p>").concat(messages, "</p>\n       "),
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.verifyAccountToVotedWaiting = verifyAccountToVotedWaiting;
function verifyAccountToVotedSuccess(email, messages) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, mailOptions;
        return __generator(this, function (_a) {
            transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                secure: false,
                auth: {
                    user: process.env.SYSTEM_USERNAME,
                    pass: process.env.SYSTEM_SECRET,
                },
            });
            mailOptions = {
                from: "andrecoso09@gmail.com",
                to: "".concat(email),
                subject: "Online Voting System",
                text: "Content-type:application/json",
                html: "\n           <h3>\n           Hi ".concat(email, " this is from Online Voting System\n           </h3>\n           <p>").concat(messages, "</p>\n           <button>\n           <a href='http://localhost:3000/signup'>LOGIN TO YOUR ACCOUNT</a>\n           </button>\n       "),
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.verifyAccountToVotedSuccess = verifyAccountToVotedSuccess;
function sendMessagesForVoted(email, messages) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, mailOptions;
        return __generator(this, function (_a) {
            transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                secure: false,
                auth: {
                    user: process.env.SYSTEM_USERNAME,
                    pass: process.env.SYSTEM_SECRET,
                },
            });
            mailOptions = {
                from: "andrecoso09@gmail.com",
                to: "".concat(email),
                subject: "Online Voting System",
                text: "Content-type:application/json",
                html: "\n           <h3>\n           Hi ".concat(email, " this is from Online Voting System\n           </h3>\n           <h3 style='color:#263238;'>\n           Congratulations Your Participate To Online Voting System Your Vote List\n           </h3>\n           ").concat(messages, "\n       "),
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.sendMessagesForVoted = sendMessagesForVoted;
