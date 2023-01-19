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
exports.usersRepository = void 0;
const mongodb_1 = require("./mongodb");
exports.usersRepository = {
    //GET
    allUsers(searchLoginTerm, searchEmailTerm, sortBy, sortDirection, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = (sortDirection === 'asc') ? 1 : -1;
            return yield mongodb_1.usersCollection
                .find(filter, { projection: { _id: 0 } })
                .sort(sortBy, order)
                .toArray();
        });
    },
    //POST
    newUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.usersCollection.insertOne(newUser);
            return result.acknowledged;
        });
    },
    //DELETE by ID
    delUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.usersCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //GET by loginOrEmail
    FindByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.usersCollection.findOne({ $or: [{ login: { $regex: loginOrEmail } }, { email: { $regex: loginOrEmail } }] });
            return result ? result : undefined;
        });
    },
};
