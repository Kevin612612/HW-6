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
exports.blogsRouter = void 0;
const express_1 = require("express");
const input_validation_middleware_1 = require("../middleware/input-validation-middleware");
const blogs_BLL_1 = require("../BLL/blogs-BLL");
const posts_BLL_1 = require("../BLL/posts-BLL");
const express_validator_1 = require("express-validator");
exports.blogsRouter = (0, express_1.Router)({});
//returns all blogs with paging
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //INPUT
    const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm : "";
    const sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    const sortDirection = req.query.sortDirection ? req.query.sortDirection : "desc";
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : '1';
    const pageSize = req.query.pageSize ? req.query.pageSize : "10";
    //BLL
    const allBlogs = yield blogs_BLL_1.blogBusinessLayer.createAllRequiredBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize);
    //RETURN
    res.status(200).send(allBlogs);
}));
//create new blog
exports.blogsRouter.post('/', input_validation_middleware_1.authorization, input_validation_middleware_1.newWebSiteUrlValidation, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    let { name, description, websiteUrl, id } = req.body;
    //BLL
    const result = yield blogs_BLL_1.blogBusinessLayer.newPostedBlog(name, description, websiteUrl, id);
    //RETURN
    res.status(201).send(result);
}));
//returns all posts by specific blog
exports.blogsRouter.get('/:blogId/posts', input_validation_middleware_1.blogsIdValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : "1";
    const pageSize = req.query.pageSize ? req.query.pageSize : "10";
    const sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    const sortDirection = req.query.sortDirection ? req.query.sortDirection : "desc";
    const blogId = req.params.blogId;
    //BLL
    const posts = yield posts_BLL_1.postBusinessLayer.getAllPostByBlogId(blogId, pageNumber, pageSize, sortBy, sortDirection);
    //RETURN
    res.status(200).send(posts);
}));
//create new post for specific blog
exports.blogsRouter.post('/:blogId/posts', input_validation_middleware_1.authorization, input_validation_middleware_1.titleValidation, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const blogId = req.params.blogId;
    let { title, shortDescription, content } = req.body;
    //BLL
    const post = yield posts_BLL_1.postBusinessLayer.newPostedPost(blogId, title, shortDescription, content);
    //RETURN
    res.status(201).send(post);
}));
//returns blog by blogId
exports.blogsRouter.get('/:blogId', input_validation_middleware_1.blogsIdValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const id = req.params.blogId;
    //BLL
    const blog = yield blogs_BLL_1.blogBusinessLayer.findBlogById(id);
    //RETURN
    res.status(200).send(blog);
}));
//update existing blog by Id with InputModel
exports.blogsRouter.put('/:blogId', input_validation_middleware_1.authorization, input_validation_middleware_1.blogsIdValidation, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, input_validation_middleware_1.newWebSiteUrlValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const id = req.params.blogId;
    let { name, description, websiteUrl } = req.body;
    //BLL
    const blog = yield blogs_BLL_1.blogBusinessLayer.updateBlogById(id, name, description, websiteUrl);
    //RETURN
    res.status(204).send(blog);
}));
//delete blog by Id
exports.blogsRouter.delete('/:blogId', input_validation_middleware_1.authorization, input_validation_middleware_1.blogsIdValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const id = req.params.blogId;
    //BLL
    const blog = yield blogs_BLL_1.blogBusinessLayer.deleteBlog(id);
    //RETURN
    res.status(204).send(blog);
}));
