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
exports.postBusinessLayer = void 0;
const mongodb_1 = require("../repositories/mongodb");
const blogs_repository_db_1 = require("../repositories/blogs-repository-db");
const posts_repository_db_1 = require("../repositories/posts-repository-db");
let countOfPosts = 0;
exports.postBusinessLayer = {
    //this method return all posts
    getAllPosts(pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortedItems = yield posts_repository_db_1.postsRepository.everyPosts(sortBy, sortDirection);
            const quantityOfDocs = yield mongodb_1.postsCollection.countDocuments({});
            return {
                pagesCount: Math.ceil(quantityOfDocs / +pageSize),
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: quantityOfDocs,
                items: sortedItems.slice((+pageNumber - 1) * (+pageSize), (+pageNumber) * (+pageSize))
            };
        });
    },
    //this method return all posts by blogId
    getAllPostByBlogId(blogId, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_repository_db_1.blogsRepository.getBlogById(blogId);
            if (blog != undefined) {
                const sortedItems = yield posts_repository_db_1.postsRepository.allPosts(blogId, sortBy, sortDirection);
                const quantityOfDocs = yield mongodb_1.postsCollection.countDocuments({ blogId: blogId });
                return {
                    pagesCount: Math.ceil(quantityOfDocs / +pageSize),
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount: quantityOfDocs,
                    items: sortedItems.slice((+pageNumber - 1) * (+pageSize), (+pageNumber) * (+pageSize))
                };
            }
            else {
                return 404;
            }
        });
    },
    //method creates post with specific blogId
    newPostedPost(blogId, title, shortDescription, content) {
        return __awaiter(this, void 0, void 0, function* () {
            countOfPosts++;
            const foundBlog = yield blogs_repository_db_1.blogsRepository.getBlogById(blogId);
            let newPost;
            if (foundBlog) {
                newPost = {
                    blogId: blogId,
                    blogName: foundBlog.name,
                    content: content,
                    createdAt: new Date(),
                    id: countOfPosts.toString(),
                    shortDescription: shortDescription,
                    title: title,
                };
                const inserted = yield posts_repository_db_1.postsRepository.newAddedPost(newPost);
                return {
                    blogId: newPost.blogId,
                    blogName: newPost.blogName,
                    content: newPost.content,
                    createdAt: newPost.createdAt,
                    id: newPost.id,
                    shortDescription: newPost.shortDescription,
                    title: newPost.title,
                };
            }
            else {
                return 404;
            }
        });
    },
    //method take post by postId
    findPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_db_1.postsRepository.getPostById(postId);
        });
    },
    //method updates post by ID
    updatePostById(postId, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield posts_repository_db_1.postsRepository.updatePost(postId, title, shortDescription, content, blogId);
            return result ? result : 404;
        });
    },
    //method deletes by ID
    delPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_db_1.postsRepository.deletePost(id);
        });
    },
};
