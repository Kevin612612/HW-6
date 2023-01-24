//Middleware



import {body, param} from 'express-validator'
import {NextFunction, Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs-repository-db";
import {postsRepository} from "../repositories/posts-repository-db";
import {usersCollection} from "../repositories/mongodb";
import {usersRepository} from "../repositories/users-repository-db";


//blogs validation
export const blogsIdValidationInParams = async (req: Request, res: Response, next: NextFunction) => {
    const blog = await blogsRepository.findBlogById(req.params.blogId)
    if (blog) {
        req.blog = await blogsRepository.findBlogById(req.params.blogId)
        next()
    } else {
        return res.status(404).send('specified blog is not exists')
    }
}

export const blogsIdValidationInBody = async (req: Request, res: Response, next: NextFunction) => {
    const blog = await blogsRepository.findBlogById(req.body.blogId)
    if (blog) {
        req.blog = await blogsRepository.findBlogById(req.body.blogId)
        next()
    } else {
        return res.status(404).send('specified blog is not exists')
    }
}

export const nameValidation = body('name')
    .trim()
    .notEmpty()
    .isString()
    .isLength({max: 15})

export const descriptionValidation = body('description')
    .trim()
    .notEmpty()
    .isString()
    .isLength({max: 500})

export const newWebSiteUrlValidation = body('websiteUrl')
    .trim()
    .notEmpty()
    .isURL({protocols: ['https']})
    .isLength({max: 100})



//posts validation
export const postsIdValidationInParams = async (req: Request, res: Response, next: NextFunction) => {
    const post = await postsRepository.findPostById(req.params.postId)
    if (post) {
        req.post = await postsRepository.findPostById(req.params.postId)
        next()
    } else {
        return res.status(404).send('specified post is not exists')
    }
}

export const titleValidation = body('title')
    .trim()
    .notEmpty()
    .isString()
    .isLength({max: 30})

export const shortDescriptionValidation = body('shortDescription')
    .trim()
    .notEmpty()
    .isString()
    .isLength({max: 100})

export const contentValidation = body('content')
    .trim()
    .notEmpty()
    .isString()
    .isLength({max: 1000})

export const blogIdValidationInPost = body('blogId')
    .isString()
    .isLength({max: 15}) //здесь я схитрил))



//users' login validation
export const usersLoginValidation = body('login')
    .trim()
    .isString()
    .isLength({min: 3, max: 10})
    .matches('^[a-zA-Z0-9_-]*$')

export const usersLoginValidation1 = body('loginOrEmail')
    .trim()
    .isString()
    .isLength({min: 3, max: 10})
    .matches('^[a-zA-Z0-9_-]*$')

//users' password validation
export const usersPasswordValidation = body('password')
    .trim()
    .isString()
    .isLength({min: 6, max: 20})

//users' e-mail validation
export const usersEmailValidation = body('email')
    .trim()
    .isString()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

export const usersEmailValidation1 = body('loginOrEmail')
    .trim()
    .isString()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

//
export const usersLoginOrEmailValidation = body('loginOrEmail')
    .trim()
    .isString()
    .isLength({min: 3, max: 20})
    .matches('^[a-zA-Z0-9_-]*$' || '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

//userId validation
export const usersIdValidationInParams = async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersCollection.findOne({id: req.params.userId})
    if (user) {
        req.user = await usersRepository.findUserByLoginOrEmail(user.login)
        next()
    } else {
        return res.status(404).send('specified user is not exists')
    }
}