import {blogViewModel, userDataModel} from "../repositories/mongodb";

//expanding type Request
declare global {
    declare namespace Express {
        export interface Request {
            user: userDataModel | undefined,
            blog: blogViewModel | undefined,
            post: any
        }
    }
}