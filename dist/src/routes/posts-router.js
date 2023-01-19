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
exports.postsRouter = void 0;
const express_1 = require("express");
const input_validation_middleware_1 = require("../middleware/input-validation-middleware");
const express_validator_1 = require("express-validator");
const posts_BLL_1 = require("../BLL/posts-BLL");
exports.postsRouter = (0, express_1.Router)({});
//returns all posts with paging
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //INPUT
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : '1';
    const pageSize = req.query.pageSize ? req.query.pageSize : "10";
    const sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    const sortDirection = req.query.sortDirection ? req.query.sortDirection : "desc";
    //BLL
    const allPosts = yield posts_BLL_1.postBusinessLayer.getAllPosts(pageNumber, pageSize, sortBy, sortDirection);
    //RETURN
    res.status(200).send(allPosts);
}));
//create new post
exports.postsRouter.post('/', input_validation_middleware_1.authorization, input_validation_middleware_1.titleValidation, input_validation_middleware_1.blogIdValidationInPost, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    let { title, shortDescription, content, blogId } = req.body;
    //BLL
    const newPost = yield posts_BLL_1.postBusinessLayer.newPostedPost(blogId, title, shortDescription, content);
    //RETURN
    res.status(201).send(newPost);
}));
//get post by postId
exports.postsRouter.get('/:postId', input_validation_middleware_1.postsIdValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const postId = req.params.postId;
    //BLL
    const post = yield posts_BLL_1.postBusinessLayer.findPostById(postId);
    //RETURN
    res.status(200).send(post);
}));
//update post
exports.postsRouter.put('/:postId', input_validation_middleware_1.authorization, input_validation_middleware_1.postsIdValidation, input_validation_middleware_1.titleValidation, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.blogIdValidationInPost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const postId = req.params.postId;
    let { title, shortDescription, content, blogId } = req.body;
    //BLL
    const post = yield posts_BLL_1.postBusinessLayer.updatePostById(postId, title, shortDescription, content, blogId);
    //RETURN
    res.status(204).send(post);
}));
//delete post by id
exports.postsRouter.delete('/:postId', input_validation_middleware_1.authorization, input_validation_middleware_1.postsIdValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //COLLECTION of ERRORS
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({ onlyFirstError: true }).map(e => {
            return {
                message: e.msg,
                field: e.param
            };
        });
        return res.status(404).send({ "errorsMessages": errs });
    }
    //INPUT
    const id = req.params.postId;
    //BLL
    const post = yield posts_BLL_1.postBusinessLayer.delPost(id);
    //RETURN
    res.status(204).send(post);
}));
