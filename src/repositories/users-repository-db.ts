//Data access Layer


import {userDataModel, usersCollection, userViewModel} from "./mongodb";


export const usersRepository = {
    //GET
    async allUsers(searchLoginTerm: string, searchEmailTerm: string, sortBy: string, sortDirection: string, filter: any): Promise<userViewModel[]> {
        const order = (sortDirection === 'asc') ? 1 : -1

        return await usersCollection
            .find(filter, {projection: {_id: 0}})
            .sort(sortBy, order)
            .toArray();

    },



    //POST
    async newUser(newUser: userDataModel): Promise<boolean> {
        const result = await usersCollection.insertOne(newUser)
        return result.acknowledged;
    },



    //DELETE by ID
    async delUser(id: string): Promise<boolean | number> {
        const result = await usersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },



    //GET by loginOrEmail
    async FindByLoginOrEmail(loginOrEmail: string): Promise<userDataModel | undefined> {
        const result = await usersCollection.findOne({$or: [{login: {$regex : loginOrEmail}}, {email: {$regex : loginOrEmail}}]})
        return result ? result : undefined
    },
}