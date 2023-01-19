"use strict";
//Business Layer
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
exports.blogBusinessLayer = void 0;
const mongodb_1 = require("../repositories/mongodb");
const blogs_repository_db_1 = require("../repositories/blogs-repository-db");
let countOfBlogs = 0;
exports.blogBusinessLayer = {
    //this method transform all found data and returns them to router
    createAllRequiredBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortedItems = yield blogs_repository_db_1.blogsRepository.allBlogs(searchNameTerm, sortBy, sortDirection);
            const quantityOfDocs = yield mongodb_1.blogsCollection.countDocuments({ name: { $regex: searchNameTerm, $options: 'i' } });
            return {
                pagesCount: Math.ceil(quantityOfDocs / +pageSize),
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: quantityOfDocs,
                items: sortedItems.slice((+pageNumber - 1) * (+pageSize), (+pageNumber) * (+pageSize))
            };
        });
    },
    //method creates blog
    newPostedBlog(name, description, websiteUrl, id) {
        return __awaiter(this, void 0, void 0, function* () {
            countOfBlogs++;
            const idName = id ? id : countOfBlogs.toString();
            const newBlog = {
                createdAt: new Date(),
                description: description.toString(),
                id: idName,
                name: name.toString(),
                websiteUrl: websiteUrl.toString(),
            };
            const inserted = yield blogs_repository_db_1.blogsRepository.newPostedBlog(newBlog);
            if (inserted) {
                return {
                    createdAt: newBlog.createdAt,
                    description: newBlog.description.toString(),
                    id: newBlog.id.toString(),
                    name: newBlog.name.toString(),
                    websiteUrl: newBlog.websiteUrl.toString(),
                };
            }
            else {
                return 404;
            }
        });
    },
    //method take blog by blogId
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blogs_repository_db_1.blogsRepository.getBlogById(id);
            return result ? result : 404;
        });
    },
    //method updates blog by ID
    updateBlogById(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blogs_repository_db_1.blogsRepository.updateBlog(id, name, description, websiteUrl);
            return result ? result : 404;
        });
    },
    //method deletes by ID
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blogs_repository_db_1.blogsRepository.deleteBlog(id);
            return result ? result : 404;
        });
    },
};
