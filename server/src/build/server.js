"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var apollo_server_core_1 = require("apollo-server-core");
var http_1 = __importDefault(require("http"));
var resolver_1 = __importDefault(require("./Resolver/resolver"));
var typedef_1 = __importDefault(require("./TypeDef/typedef"));
var cors_1 = __importDefault(require("cors"));
var schema_1 = require("@graphql-tools/schema");
var mongoose_1 = require("mongoose");
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var jsonwebtoken_1 = require("jsonwebtoken");
var graphql_upload_1 = require("graphql-upload");
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var FindUser_1 = __importDefault(require("./CustomFunction/FindUser"));
var jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
var generateToken_1 = __importDefault(require("./JWT/generateToken"));
var IO = __importStar(require("socket.io"));
var socket_1 = __importDefault(require("./CustomFunction/socket"));
// import {sdasd} from './Schema/sampleRegisteredVoters';
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var app, httpServer, io, schema, server, corsOptions, authUserIO;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = (0, express_1.default)();
                    httpServer = http_1.default.createServer(app);
                    io = new IO.Server(httpServer);
                    schema = (0, schema_1.makeExecutableSchema)({
                        typeDefs: typedef_1.default,
                        resolvers: resolver_1.default,
                    });
                    server = new apollo_server_express_1.ApolloServer({
                        schema: schema,
                        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer: httpServer })],
                        context: function (_a) {
                            var req = _a.req, res = _a.res;
                            return ({ req: req, res: res });
                        },
                    });
                    return [4 /*yield*/, server.start()];
                case 1:
                    _a.sent();
                    corsOptions = {
                        origin: "http://localhost:3000",
                        credentials: true,
                    };
                    app.use((0, cors_1.default)(corsOptions));
                    app.use((0, cookie_parser_1.default)());
                    app.use(function (req, res, next) {
                        if (Object.keys(req.cookies).length === 0) {
                            return next();
                        }
                        try {
                            var ACCESS_TOKEN = req.cookies["ACCESS_TOKEN"];
                            var user = (0, jsonwebtoken_1.verify)(ACCESS_TOKEN, process.env.ACCESS_TOKEN);
                            req.userId = user._id;
                            req.userEmail = user.email;
                            next();
                        }
                        catch (err) {
                            var REFRESH_TOKEN_1 = req.cookies["REFRESH_TOKEN"];
                            if (!REFRESH_TOKEN_1) {
                                res.sendStatus(405);
                            }
                            var _id = (0, jwt_decode_1.default)(REFRESH_TOKEN_1)._id;
                            (0, FindUser_1.default)(_id)
                                .then(function (data) {
                                if (data.securedDetails[0].refreshToken[0] !== REFRESH_TOKEN_1) {
                                    res.clearCookie("ACCESS_TOKEN");
                                    res.clearCookie("REFRESH_TOKEN");
                                }
                                res.clearCookie("ACCESS_TOKEN");
                                jsonwebtoken_2.default.verify(REFRESH_TOKEN_1, process.env.REFRESH_TOKEN, function (err) {
                                    if (err) {
                                        console.log("Here Me and I have Error:" + err);
                                        return res.sendStatus(405);
                                    }
                                    var NEW_ACCESS_TOKEN = (0, generateToken_1.default)({
                                        _id: data._id,
                                        email: data.securedDetails[0].email,
                                    });
                                    res.cookie("ACCESS_TOKEN", NEW_ACCESS_TOKEN, {
                                        secure: true,
                                        httpOnly: true,
                                    });
                                });
                                return res.sendStatus(401);
                            })
                                .catch(function (err) {
                                console.log("Here Me adn I have Error:" + err);
                            });
                        }
                    });
                    authUserIO = io.of("/userAuthenticated");
                    authUserIO.use(function (socket, next) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, socket_1.default)(io, socket, next)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.use((0, graphql_upload_1.graphqlUploadExpress)());
                    server.applyMiddleware({ app: app });
                    (0, mongoose_1.connect)(process.env.DB_URL, { useNewUrlParser: true }, function (err) {
                        if (err) {
                            new Error("Error Found in Server to connect in mongoose");
                        }
                        httpServer.listen({ port: process.env.PORT }, function () {
                            return console.log("Listen in port 4000");
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error(err);
});
