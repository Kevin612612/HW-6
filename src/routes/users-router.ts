//Presentation Layer


import {Request, Response, Router} from "express";
import {userBusinessLayer} from "../BLL/users-BLL";
import {
    authorization,
    usersEmailValidation, usersIdValidation,
    usersLoginValidation,
    usersPasswordValidation
} from "../middleware/input-validation-middleware";
import {validationResult} from "express-validator";



export const usersRouter = Router({})

//return all users
usersRouter.get('/',
    authorization,
    async (req: Request, res: Response) => {
        //INPUT
        let {pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm} = req.query
        const a = pageNumber ? pageNumber : '1'
        const b = pageSize ? pageSize : "10"
        const c = sortBy ? sortBy : "createdAt"
        const d = sortDirection ? sortDirection : "desc"
        const e = searchLoginTerm ? searchLoginTerm : null
        const f = searchEmailTerm ? searchEmailTerm : null
        //BLL
        const allUsers = await userBusinessLayer.createAllRequiredUsers(a, b, c, d, e, f)
        //RETURN
        res.status(200).send(allUsers)
    })


//create new user
usersRouter.post('/',
    authorization,
    usersLoginValidation,
    usersPasswordValidation,
    usersEmailValidation,
    async (req: Request, res: Response) => {
        //COLLECTION of ERRORS
        const errors = validationResult(req)
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
        let {id, login, password, email} = req.body
        //BLL
        const user = await userBusinessLayer.newPostedUser(id, login, password, email)
        //RETURN
        res.status(201).send(user)

    })


//delete user bu ID
usersRouter.delete('/:userId',
    authorization,
    usersIdValidation,
    async (req: Request, res: Response) => {
        //COLLECTION of ERRORS
        const errors = validationResult(req)
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
        const id = req.params.userId
        //BLL
        const user = await userBusinessLayer.deleteUser(id)
        //RETURN
        res.status(204).send(user)
    })
