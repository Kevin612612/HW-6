//Presentation Layer



import {Request, Response, Router} from "express";
import {blogViewModel, db, postViewModel, userViewModel} from "../repositories/mongodb";

export const testingRouter = Router({})

//delete all-data
testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    const result1 = await db.collection<blogViewModel>("blogs").deleteMany({})
    const result2 = await db.collection<postViewModel>("posts").deleteMany({})
    const result3 = await db.collection<userViewModel>("users").deleteMany({})

    const result4 = await db.collection<blogViewModel>("blogs").find({}).toArray()
    const result5 = await db.collection<blogViewModel>("posts").find({}).toArray()
    const result6 = await db.collection<userViewModel>("users").find({}).toArray()


    if (result4?.length == 0 && result5?.length == 0 && result6?.length == 0) {
        res.send(204)
    }
})