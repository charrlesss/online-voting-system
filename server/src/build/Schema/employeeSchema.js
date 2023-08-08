"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var employee = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        default: "",
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
    urlID: {
        type: String,
        default: '',
    },
    secret: {
        type: Boolean,
        default: true
    },
    redirect: {
        type: Boolean,
        default: false
    },
    credential: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "employee",
    },
    verifyCode: {
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
        default: []
    },
    basicDetails: {
        type: Array,
        default: [{
                profile: {
                    type: String,
                    default: '',
                },
                address: {
                    type: String,
                    default: '',
                },
                birthdate: {
                    type: String,
                    default: '',
                }
            }]
    }
}, { versionKey: false });
var Employee = mongoose_1.default.model("EmployeeModel", employee);
exports.default = Employee;
