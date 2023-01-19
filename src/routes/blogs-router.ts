//Presentation Layer


import {Request, Response, Router} from "express";
import {
    authorization,
    descriptionValidation,
    blogsIdValidation,
    nameValidation,
    newWebSiteUrlValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation
} from "../middleware/input-validation-middleware";
import {blogBusinessLayer} from "../BLL/blogs-BLL";
import {postBusinessLayer} from "../BLL/posts-BLL";
import {validationResult} from "express-validator";

export const blogsRouter = Router({})


//returns all blogs with paging
blogsRouter.get('/', async (req: Request, res: Response) => {
    //INPUT
    const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm : "";
    const sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    const sortDirection = req.query.sortDirection ? req.query.sortDirection : "desc";
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : '1';
    const pageSize = req.query.pageSize ? req.query.pageSize : "10";
    //BLL
    const allBlogs = await blogBusinessLayer.createAllRequiredBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
    //RETURN
    res.status(200).send(allBlogs)
})


//create new blog
blogsRouter.post('/',
    authorization,
    newWebSiteUrlValidation,
    nameValidation,
    descriptionValidation,
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
        let {name, description, websiteUrl, id} = req.body
        //BLL
        const result = await blogBusinessLayer.newPostedBlog(name, description, websiteUrl, id)
        //RETURN
        res.status(201).send(result)
    })


//returns all posts by specific blog
blogsRouter.get('/:blogId/posts',
    blogsIdValidation,
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
            return res.status(404).send({"errorsMessages": errs})
        }
        //INPUT
        const pageNumber = req.query.pageNumber ? req.query.pageNumber : "1";
        const pageSize = req.query.pageSize ? req.query.pageSize : "10";
        const sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
        const sortDirection = req.query.sortDirection ? req.query.sortDirection : "desc";
        const blogId = req.params.blogId
        //BLL
        const posts = await postBusinessLayer.getAllPostByBlogId(blogId, pageNumber, pageSize, sortBy, sortDirection)
        //RETURN
        res.status(200).send(posts)
    })


//create new post for specific blog
blogsRouter.post('/:blogId/posts',
    authorization,
    titleValidation,
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
        const blogId = req.params.blogId
        let {title, shortDescription, content} = req.body
        //BLL
        const post = await postBusinessLayer.newPostedPost(blogId, title, shortDescription, content)
        //RETURN
        res.status(201).send(post)
    })


//returns blog by blogId
blogsRouter.get('/:blogId',
    blogsIdValidation,
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
        const id = req.params.blogId
        //BLL
        const blog = await blogBusinessLayer.findBlogById(id)
        //RETURN
        res.status(200).send(blog)
    })


//update existing blog by Id with InputModel
blogsRouter.put('/:blogId',
    authorization,
    blogsIdValidation,
    nameValidation,
    descriptionValidation,
    newWebSiteUrlValidation,
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
        const id = req.params.blogId
        let {name, description, websiteUrl} = req.body
        //BLL
        const blog = await blogBusinessLayer.updateBlogById(id, name, description, websiteUrl)
        //RETURN
        res.status(204).send(blog)
    })


//delete blog by Id
blogsRouter.delete('/:blogId',
    authorization,
    blogsIdValidation,
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
        const id = req.params.blogId;
        //BLL
        const blog = await blogBusinessLayer.deleteBlog(id)
        //RETURN
        res.status(204).send(blog)
    })
