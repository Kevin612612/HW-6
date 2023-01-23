import {userDataModel} from "../repositories/mongodb";

declare global {
    declare namespace Express {
        export interface Request {
            context: [{ user: userDataModel | undefined }, { somethingElse: string }, { oneMore: string }]
        }
    }
}