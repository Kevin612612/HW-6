//this repository have to be async

import {MongoClient} from "mongodb";

import * as dotenv from 'dotenv'
dotenv.config()



//BLOGS
//view type
export type blogViewModel = {id: string, name: string, description: string, websiteUrl: string, createdAt: Date}

//blogType returned by POST-method
export type blogsTypeSchema = {pagesCount:	number, page: number, pageSize: number, totalCount: number, items: blogViewModel[]}



//POSTS
//view type
export type postViewModel = {id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string, createdAt: Date}

//postType returned by POST-method
export type PostsTypeSchema = {pagesCount: number, page: number, pageSize: number, totalCount: number, items: postViewModel[]}



//USERS
//view type
export type userViewModel = {id: string, login: string, email: string, createdAt: Date}

//data type
export type userDataModel = {id: string, login: string, email: string, createdAt: Date, passwordSalt: string, passwordHash: string}

//userType returned by POST-method
export type UsersTypeSchema = {pagesCount: number, page: number, pageSize: number, totalCount: number, items: userViewModel[]}



//COMMENTS
//view type
export type commentViewModel = {id: string, content: string, userId: string, userLogin: string, createdAt: Date}

//data type
export type commentDataModel = {id: string, content: string, userId: string, userLogin: string, createdAt: Date, postId: string}

//userType returned by POST-method
export type CommentsTypeSchema = {pagesCount: number, page: number, pageSize: number, totalCount: number, items: commentViewModel[]}





//APIErrorResult
export type errors = {errorsMessages: fieldError[]}
type fieldError = {message: string, field: string}

//======================================================================================================================

//connection to mongodb
const mongoUri = process.env.MONGO_URL! // || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);

export const db = client.db("hosting");
export const blogsCollection = db.collection<blogViewModel>("blogs")
export const postsCollection = db.collection<postViewModel>("posts")
export const usersCollection = db.collection<userDataModel>("users")
export const commentsCollection = db.collection<commentViewModel>("comments")

export async function runDb() {
    try {
        //Connect the client to the server
        await client.connect();
        //Establish and verify connection
        await client.db('blogs').command({ping: 1});
        console.log('Connected successfully to mongo server')
    }
    catch {
        console.log("Can't connect to db")
        //Ensure that the client will close when you finish/error
        await client.close();
    }
}
