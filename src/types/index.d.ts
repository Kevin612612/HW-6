import {blogViewModel, postViewModel, userDataModel} from "../repositories/mongodb";

//expanding type Request
declare global {
    declare namespace Express {
        export interface Request {
            user: userDataModel | undefined,
            blog: blogViewModel | undefined,
            post: postViewModel | undefined,
        }
    }
}