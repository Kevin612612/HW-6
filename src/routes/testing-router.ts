//Presentation Layer




import {Request, Response, Router} from "express";
import {blogViewModel, commentViewModel, postViewModel, userViewModel} from "../types";
import {db} from "../repositories/mongodb";

export const testingRouter = Router({})

//delete all-data
testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    const a = await db.collection<blogViewModel>("blogs").deleteMany({})
    const b = await db.collection<postViewModel>("posts").deleteMany({})
    const c = await db.collection<userViewModel>("users").deleteMany({})
    const d = await db.collection<commentViewModel>("comments").deleteMany({})

    const result1 = await db.collection<blogViewModel>("blogs").find({}).toArray()
    const result2 = await db.collection<blogViewModel>("posts").find({}).toArray()
    const result3 = await db.collection<userViewModel>("users").find({}).toArray()
    const result4 = await db.collection<userViewModel>("comments").find({}).toArray()

    if (result1?.length == 0 && result2?.length == 0 && result3?.length == 0 && result4?.length == 0) {
        res.send(204)
    }
})