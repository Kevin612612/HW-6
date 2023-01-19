//Business Layer

import {userViewModel, UsersTypeSchema, usersCollection} from "../repositories/mongodb";
import {usersRepository} from "../repositories/users-repository-db";
import bcrypt from "bcrypt"

let countOfUsers = 0


export const userBusinessLayer = {
    //this method returns all users to router
    async createAllRequiredUsers(pageNumber: any, pageSize: any, sortBy: any, sortDirection: any, searchLoginTerm: any, searchEmailTerm: any): Promise<UsersTypeSchema> {
        let filter = {}
        if (searchLoginTerm && searchEmailTerm) {
            filter = {$or: [{login: {$regex : searchLoginTerm, $options:'i'}}, {email: {$regex : searchEmailTerm, $options:'i'}}]}
        }

        if (searchLoginTerm && !searchEmailTerm) {
            filter = {login: {$regex : searchLoginTerm, $options:'i'}}
        }

        if (!searchLoginTerm && searchEmailTerm) {
            filter = {email: {$regex : searchEmailTerm, $options:'i'}}
        }

        if (!searchLoginTerm && !searchEmailTerm) {
            filter = {}
        }
        const sortedItems = await usersRepository.allUsers(searchLoginTerm, searchEmailTerm, sortBy, sortDirection, filter)

        const quantityOfDocs = await usersCollection.countDocuments(filter)

        return {
            pagesCount: Math.ceil(quantityOfDocs / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: quantityOfDocs,
            items: sortedItems.slice((+pageNumber - 1) * (+pageSize), (+pageNumber) * (+pageSize)).map(e => {
                return {
                    id: e.id,
                    login: e.login,
                    email: e.email,
                    createdAt: e.createdAt,
                }
            })
        }
    },



    //method creates user
    async newPostedUser(id: string, login: string, password: string, email: string): Promise<userViewModel | number> {
        countOfUsers++

        const idName: string = id ? id : countOfUsers.toString()
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, passwordSalt)

        const newUser = {
            id: idName,
            login: login,
            email: email,
            passwordSalt,
            passwordHash,
            createdAt: new Date()
        }

        const inserted = await usersRepository.newUser(newUser)

        if (inserted) {
            return {
                id: newUser.id,
                login: newUser.login,
                email: newUser.email,
                createdAt: newUser.createdAt
            };
        } else {
            return 404
        }
    },
    // async _generateHash(password: string, salt: string) {
    //     return await bcrypt.hash(password, salt)
    // },



    //method deletes by ID
    async deleteUser(id: string): Promise<boolean | number> {
        const result = await usersRepository.delUser(id)
        return result ? result : 404
    },
}
