//Presentation Layer


import {Request, Response, Router} from "express";
import {
    authorization,
    blogIdValidationInPost,
    contentValidation,
    postsIdValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middleware/input-validation-middleware";
import {validationResult} from "express-validator";
import {postBusinessLayer} from "../BLL/posts-BLL";

export const postsRouter = Router({})


//returns all posts with paging
postsRouter.get('/', async(req: Request, res: Response) => {
    //INPUT
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : '1';
    const pageSize = req.query.pageSize ? req.query.pageSize : "10";
    const sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    const sortDirection = req.query.sortDirection ? req.query.sortDirection : "desc";
    //BLL
    const allPosts = await postBusinessLayer.getAllPosts(pageNumber, pageSize, sortBy, sortDirection)
    //RETURN
    res.status(200).send(allPosts)
})



//create new post
postsRouter.post('/',
    authorization,
    titleValidation,
    blogIdValidationInPost,
    shortDescriptionValidation,
    contentValidation,

    async (req: Request, res: Response) => {
        //COLLECTION of ERRORS
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errs = errors.array({onlyFirstError: true}).map(e => {
                return {
                    message: e.msg,
                    field: e.param
                }
            })
            return res.status(400).send({"errorsMessages": errs})
        }
        //INPUT
        let {title, shortDescription, content, blogId} = req.body
        //BLL
        const newPost = await postBusinessLayer.newPostedPost(blogId, title, shortDescription, content)
        //RETURN
        res.status(201).send(newPost)
    })



//get post by postId
postsRouter.get('/:postId', postsIdValidation, async(req: Request, res: Response) => {
    //COLLECTION of ERRORS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({onlyFirstError: true}).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        return res.status(400).send({"errorsMessages": errs})
    }
    //INPUT
    const postId = req.params.postId
    //BLL
    const post = await postBusinessLayer.findPostById(postId)
    //RETURN
    res.status(200).send(post)
})



//update post
postsRouter.put('/:postId',
    authorization,
    postsIdValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidationInPost,

    async(req: Request, res: Response) => {
        //COLLECTION of ERRORS
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errs = errors.array({onlyFirstError: true}).map(e => {
                return {
                    message: e.msg,
                    field: e.param
                }
            })
            return res.status(400).send({"errorsMessages": errs})
        }
        //INPUT
        const postId = req.params.postId
        let {title, shortDescription, content, blogId} = req.body
        //BLL
        const post = await postBusinessLayer.updatePostById(postId, title, shortDescription, content, blogId)
        //RETURN
        res.status(204).send(post)
    })



//delete post by id
postsRouter.delete('/:postId', authorization, postsIdValidation, async(req: Request, res: Response) => {
    //COLLECTION of ERRORS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({onlyFirstError: true}).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        return res.status(404).send({"errorsMessages": errs})
    }
    //INPUT
    const id = req.params.postId;
    //BLL
    const post = await postBusinessLayer.delPost(id)
    //RETURN
    res.status(204).send(post)
})
