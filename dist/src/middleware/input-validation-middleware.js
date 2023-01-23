"use strict";
//Middleware
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersIdValidation = exports.usersLoginOrEmailValidation = exports.usersEmailValidation1 = exports.usersEmailValidation = exports.usersPasswordValidation = exports.usersLoginValidation1 = exports.usersLoginValidation = exports.blogIdValidationInPost = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.postsIdValidation = exports.newWebSiteUrlValidation = exports.descriptionValidation = exports.nameValidation = exports.blogsIdValidation = exports.authorization = void 0;
const express_validator_1 = require("express-validator");
//Authorization
const authorization = (req, res, next) => {
    if (req.headers.authorization == 'Basic YWRtaW46cXdlcnR5') {
        next();
    }
    else {
        res.status(401).send("Unauthorized");
    }
};
exports.authorization = authorization;
//blogs validation
exports.blogsIdValidation = (0, express_validator_1.param)('blogId')
    .notEmpty()
    .isString();
exports.nameValidation = (0, express_validator_1.body)('name')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 15 });
exports.descriptionValidation = (0, express_validator_1.body)('description')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 500 });
exports.newWebSiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .trim()
    .notEmpty()
    .isURL({ protocols: ['https'] })
    .isLength({ max: 100 });
//posts validation
exports.postsIdValidation = (0, express_validator_1.param)('postId')
    .notEmpty()
    .isString();
exports.titleValidation = (0, express_validator_1.body)('title')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 30 });
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 100 });
exports.contentValidation = (0, express_validator_1.body)('content')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 1000 });
exports.blogIdValidationInPost = (0, express_validator_1.body)('blogId')
    .isString()
    .isLength({ max: 15 }); //здесь я схитрил))
//users' login validation
exports.usersLoginValidation = (0, express_validator_1.body)('login')
    .trim()
    .isString()
    .isLength({ min: 3, max: 10 })
    .matches('^[a-zA-Z0-9_-]*$');
exports.usersLoginValidation1 = (0, express_validator_1.body)('loginOrEmail')
    .trim()
    .isString()
    .isLength({ min: 3, max: 10 })
    .matches('^[a-zA-Z0-9_-]*$');
//users' password validation
exports.usersPasswordValidation = (0, express_validator_1.body)('password')
    .trim()
    .isString()
    .isLength({ min: 6, max: 20 });
//users' e-mail validation
exports.usersEmailValidation = (0, express_validator_1.body)('email')
    .trim()
    .isString()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
exports.usersEmailValidation1 = (0, express_validator_1.body)('loginOrEmail')
    .trim()
    .isString()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
//
exports.usersLoginOrEmailValidation = (0, express_validator_1.body)('loginOrEmail')
    .trim()
    .isString()
    .isLength({ min: 3, max: 20 })
    .matches('^[a-zA-Z0-9_-]*$' || '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
//userId validation
exports.usersIdValidation = (0, express_validator_1.param)('userId')
    .notEmpty()
    .isString();
