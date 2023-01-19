"use strict";
//Presentation Layer
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
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwtService = {
    //create token
    createJWT(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { userId: user.id,
                login: user.login,
                email: user.email };
            const secretOrPrivateKey = process.env.JWT_secret;
            return jsonwebtoken_1.default.sign(payload, secretOrPrivateKey, { expiresIn: '1h' });
        });
    },
    //method return user by token
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, process.env.JWT_secret);
                return {
                    userId: result.userId,
                    login: result.login,
                    email: result.email
                };
            }
            catch (_a) {
                return null;
            }
        });
    }
};
