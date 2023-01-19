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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_BLL_1 = require("../BLL/auth-BLL");
const input_validation_middleware_1 = require("../middleware/input-validation-middleware");
const jwt_service_1 = require("../application/jwt-service");
exports.authRouter = (0, express_1.Router)({});
//AUTH
exports.authRouter.post('/', (0, express_validator_1.oneOf)([input_validation_middleware_1.usersLoginValidation1, input_validation_middleware_1.usersEmailValidation1]), input_validation_middleware_1.usersPasswordValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //COLLECTION of ERRORS
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({ onlyFirstError: true }).map(e => {
            return {
                message: e.msg,
                field: e.param
            };
        });
        return res.status(400).send({ "errorsMessages": errs });
    }
    //INPUT
    let { loginOrEmail, password } = req.body;
    //BLL
    const user = yield auth_BLL_1.authBusinessLayer.IsUserExist(loginOrEmail, password);
    debugger;
    //RETURN
    if (typeof (user) !== "number") {
        const token = yield jwt_service_1.jwtService.createJWT(user);
        res.status(201).send(token);
    }
    else {
        res.status(401);
    }
}));
