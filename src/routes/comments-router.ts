//Presentation Layer




//(1)put     update comments
//(2)delete  delete comment
//(3)get     returns comment by Id


import {Request, Response, Router} from "express";
import {validationResult} from "express-validator";
import {commentsBusinessLayer} from "../BLL/comments-BLL";
import {authorization} from "../middleware/authorization-middleware";

export const commentsRouter = Router({})

//(1) update comments
commentsRouter.put('/:commentId',
    authorization,
    async (req: Request, res: Response) => {
    //COLLECTION of ERRORS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({onlyFirstError: true})
        const result = {errorsMessages: errs.map(e => {return {message: e.msg, field: e.param}})}
        return res.status(400).json(result)
    }
    //INPUT
    const id = req.params.commentId
    const content = req.body.content
    //BLL
    const comment = await commentsBusinessLayer.updateCommentById(id, content)
    //RETURN
    res.status(204).send(comment)
})



//(2) delete comments
commentsRouter.delete('/:commentId',
    authorization,
    async (req: Request, res: Response) => {
        //COLLECTION of ERRORS
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errs = errors.array({onlyFirstError: true})
            const result = {errorsMessages: errs.map(e => {return {message: e.msg, field: e.param}})}
            return res.status(400).json(result)
        }
        //INPUT
        const id = req.params.blogId;
        //BLL
        const comment = await commentsBusinessLayer.deleteComment(id)
        //RETURN
        res.status(204).send(comment)
    })



//(3) returns comment by Id
commentsRouter.get('/:commentId',
    async (req: Request, res: Response) => {
        //INPUT
        const id = req.params.commentId
        //BLL
        const comment = await commentsBusinessLayer.findCommentById(id)
        //RETURN
        res.status(200).send(comment)
    })