//Middleware


import {Request, Response, NextFunction} from 'express'
import {body, param} from 'express-validator'

//Authorization
export const authorization = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization == 'Basic YWRtaW46cXdlcnR5') {
        next()
    } else {
        res.status(401).send("Unauthorized")
    }
}

//blogs validation
export const blogsIdValidation = param('blogId')
    .notEmpty()
    .isString()

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
export const postsIdValidation = param('postId')
    .notEmpty()
    .isString()

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
export const usersIdValidation = param('userId')
    .notEmpty()
    .isString()