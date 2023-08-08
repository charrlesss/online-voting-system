"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var voters = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "",
    },
    voted: {
        type: Boolean,
        default: false
    },
    secret: {
        type: Boolean,
        default: false
    },
    redirect: {
        type: Boolean,
        default: true
    },
    urlID: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toLocaleString(),
    },
    authenticated: {
        type: Boolean,
        default: false
    },
    registered: {
        type: Boolean,
        default: false
    },
    verify: {
        type: Boolean,
        default: false
    },
    credential: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "voter",
    },
    verifyCode: {
        type: Boolean,
        default: false
    },
    waitingVerified: {
        type: Boolean,
        default: false
    },
    log: {
        type: Array,
        default: [{
                login: {
                    type: Date,
                    default: new Date().toLocaleString()
                },
                logout: {
                    type: Date,
                    default: new Date().toLocaleString()
                }
            }]
    },
    securedDetails: {
        type: Array,
        default: [{
                email: {
                    type: String,
                    default: '',
                },
                password: {
                    type: String,
                    default: '',
                },
                code: {
                    type: String,
                    default: '',
                },
                refreshToken: {
                    type: Array,
                    default: [],
                },
                votersIDNumber: {
                    type: String,
                    default: '',
                },
                idFile: {
                    type: String,
                    default: '',
                },
            }]
    },
    basicDetails: {
        type: Array,
        default: []
    },
    voteList: {
        type: Array,
        default: []
    }
}, { versionKey: false });
var VotersModel = mongoose_1.default.model("VotersModel", voters);
exports.default = VotersModel;
