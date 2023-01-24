"use strict";
//Middleware
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
exports.usersIdValidationInParams = exports.usersLoginOrEmailValidation = exports.usersEmailValidation1 = exports.usersEmailValidation = exports.usersPasswordValidation = exports.usersLoginValidation1 = exports.usersLoginValidation = exports.blogIdValidationInPost = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.postsIdValidationInParams = exports.newWebSiteUrlValidation = exports.descriptionValidation = exports.nameValidation = exports.blogsIdValidationInBody = exports.blogsIdValidationInParams = void 0;
const express_validator_1 = require("express-validator");
const blogs_repository_db_1 = require("../repositories/blogs-repository-db");
const posts_repository_db_1 = require("../repositories/posts-repository-db");
const mongodb_1 = require("../repositories/mongodb");
const users_repository_db_1 = require("../repositories/users-repository-db");
//blogs validation
const blogsIdValidationInParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_db_1.blogsRepository.findBlogById(req.params.blogId);
    if (blog) {
        req.blog = yield blogs_repository_db_1.blogsRepository.findBlogById(req.params.blogId);
        next();
    }
    else {
        return res.status(404).send('specified blog is not exists');
    }
});
exports.blogsIdValidationInParams = blogsIdValidationInParams;
const blogsIdValidationInBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_db_1.blogsRepository.findBlogById(req.body.blogId);
    if (blog) {
        req.blog = yield blogs_repository_db_1.blogsRepository.findBlogById(req.body.blogId);
        next();
    }
    else {
        return res.status(404).send('specified blog is not exists');
    }
});
exports.blogsIdValidationInBody = blogsIdValidationInBody;
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
const postsIdValidationInParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_db_1.postsRepository.findPostById(req.params.postId);
    if (post) {
        req.post = yield posts_repository_db_1.postsRepository.findPostById(req.params.postId);
        next();
    }
    else {
        return res.status(404).send('specified post is not exists');
    }
});
exports.postsIdValidationInParams = postsIdValidationInParams;
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
const usersIdValidationInParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield mongodb_1.usersCollection.findOne({ id: req.params.userId });
    if (user) {
        req.user = yield users_repository_db_1.usersRepository.findUserByLoginOrEmail(user.login);
        next();
    }
    else {
        return res.status(404).send('specified user is not exists');
    }
});
exports.usersIdValidationInParams = usersIdValidationInParams;
