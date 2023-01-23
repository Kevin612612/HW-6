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
exports.postsRepository = void 0;
//(1) allPosts
//(2) allPostByBlogId
//(3) newPostedPost
//(4) findPostById
//(5) updatePostById
//(6) deletePost
const mongodb_1 = require("./mongodb");
exports.postsRepository = {
    //(1) method returns posts by blogID
    allPosts(blogId, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = sortDirection === 'asc' ? 1 : -1; // порядок сортировки
            return yield mongodb_1.postsCollection
                .find({ blogId: blogId }, { projection: { _id: 0 } })
                .sort(sortBy, order)
                .toArray();
        });
    },
    //(2) method returns all posts
    allPostByBlogId(sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = sortDirection === 'asc' ? 1 : -1; // порядок сортировки
            return yield mongodb_1.postsCollection
                .find({}, { projection: { _id: 0 } })
                .sort(sortBy, order)
                .toArray();
        });
    },
    //(3) method posts new post
    newPostedPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.postsCollection.insertOne(newPost);
            return result.acknowledged;
        });
    },
    //(4) method returns post by ID
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongodb_1.postsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return post ? post : 404;
        });
    },
    //(5) method updates post by ID
    updatePostById(postId, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogFoundName = yield mongodb_1.blogsCollection.findOne({ id: blogId });
            let postFound;
            if (blogFoundName) {
                postFound = yield mongodb_1.postsCollection.find({ id: postId });
                if (postFound) {
                    const result = yield mongodb_1.postsCollection.updateOne({ id: postId }, {
                        $set: {
                            blogId: blogId,
                            blogName: blogFoundName.name,
                            content: content,
                            id: postId,
                            shortDescription: shortDescription,
                            title: title,
                        }
                    });
                    return result.matchedCount === 1;
                }
                else {
                    return 404;
                }
            }
            else {
                return 404;
            }
        });
    },
    //(6) method deletes by ID
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.postsCollection.deleteOne({ id: postId });
            return result.deletedCount ? result.deletedCount === 1 : 404;
        });
    }
};
