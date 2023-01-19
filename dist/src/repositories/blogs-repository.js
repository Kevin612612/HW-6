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
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [
    {
        id: '1',
        name: "blog1",
        description: "blog1 about nothing",
        websiteUrl: "/url/uri",
        createdAt: new Date(-3)
    },
    {
        id: '2',
        name: "blog2",
        description: "blog2 about nothing",
        websiteUrl: "/url/uri",
        createdAt: new Date(-2)
    },
    {
        id: '3',
        name: "blog3",
        description: "blog3 about nothing",
        websiteUrl: "/url/uri",
        createdAt: new Date(-1)
    }
];
let countOfBlogs = exports.blogs.length;
exports.blogsRepository = {
    //method returns all blogs
    allBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.blogs;
        });
    },
    //method posts new blog
    newPostedBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            countOfBlogs++;
            const newBlog = {
                id: countOfBlogs.toString(),
                name: name.toString(),
                description: description.toString(),
                websiteUrl: websiteUrl.toString(),
                createdAt: new Date()
            };
            exports.blogs.push(newBlog);
            return newBlog;
        });
    },
    //method returns blog by ID
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = exports.blogs.find(b => b.id === id);
            if (blog) {
                return blog;
            }
            else {
                return 404;
            }
        });
    },
    //method updates blog by ID
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = exports.blogs.find(b => b.id === id);
            if (blog) {
                blog.name = name;
                blog.description = description;
                blog.websiteUrl = websiteUrl;
                return blog;
            }
            else {
                return 404;
            }
        });
    },
    //method deletes by ID
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = exports.blogs.filter(b => b.id !== id);
            if (newBlog.length < exports.blogs.length) {
                exports.blogs = newBlog;
                return exports.blogs;
            }
            else {
                return 404;
            }
        });
    }
};
