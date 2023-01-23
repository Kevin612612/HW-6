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
exports.blogsRepository = void 0;
//(1) allBlogs
//(2) newPostedBlog
//(3) findBlogById
//(4) updateBlogById
//(5) deleteBlog
const mongodb_1 = require("./mongodb");
exports.blogsRepository = {
    //(1) method returns structured Array
    allBlogs(searchNameTerm, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = sortDirection == 'asc' ? 1 : -1; // порядок сортировки
            return yield mongodb_1.blogsCollection
                .find({ name: { $regex: searchNameTerm, $options: 'i' } }, { projection: { _id: 0 } })
                .sort(sortBy, order)
                .toArray();
        });
    },
    //(2) method posts new blog in Db
    newPostedBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.blogsCollection.insertOne(newBlog);
            return result.acknowledged;
        });
    },
    //(3) method returns blog by ID
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.blogsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return result ? result : undefined;
        });
    },
    //(4) method updates blog by ID
    updateBlogById(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.blogsCollection.updateOne({ id: id }, {
                $set: {
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                }
            });
            return result.matchedCount === 1;
        });
    },
    //(5) method deletes by ID
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
};
