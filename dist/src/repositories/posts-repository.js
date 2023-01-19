"use strict";
//Data access Layer
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
exports.postsRepository = exports.posts = void 0;
const blogs_repository_1 = require("./blogs-repository");
exports.posts = [
    {
        id: "1",
        title: "one",
        shortDescription: "first",
        content: "hello",
        blogId: "345",
        blogName: "kevin",
        createdAt: new Date(-3)
    },
    {
        id: "2",
        title: "two",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string",
        createdAt: new Date(-2)
    },
    {
        id: "3",
        title: "three",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string",
        createdAt: new Date(-1)
    }
];
let countOfPosts = exports.posts.length;
exports.postsRepository = {
    //method returns all posts
    allPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.posts;
        });
    },
    //method posts new post
    newAddedPost(title, shortDescription, content, blogId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            countOfPosts++;
            const newPost = {
                id: countOfPosts.toString(),
                title: title.toString(),
                shortDescription: shortDescription.toString(),
                content: content.toString(),
                blogId: blogId.toString(),
                blogName: (_a = blogs_repository_1.blogs.find(b => b.id === blogId)) === null || _a === void 0 ? void 0 : _a.name.toString(),
                createdAt: new Date()
            };
            exports.posts.push(newPost);
            return newPost;
        });
    },
    //method returns post by ID
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = exports.posts.find(b => b.id === id);
            if (post) {
                return post;
            }
            else {
                return 404;
            }
        });
    },
    //method updates post by id
    updatePost(id, title, shortDescription, content, blogId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const post = exports.posts.find(b => b.id === id);
            if (post) {
                post.id = id;
                post.title = title;
                post.shortDescription = shortDescription;
                post.content = content;
                post.blogId = blogId;
                post.blogName = (_a = blogs_repository_1.blogs.find(b => b.id === blogId)) === null || _a === void 0 ? void 0 : _a.name.toString();
                return post;
            }
            else {
                return 404;
            }
        });
    },
    //method deletes post by ID
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPosts = exports.posts.filter(b => b.id !== id);
            if (newPosts.length < exports.posts.length) {
                exports.posts = newPosts;
                return exports.posts;
            }
            else {
                return 404;
            }
        });
    },
};
