//Presentation Layer



import {Request, Response, Router} from "express";
import {oneOf, validationResult} from "express-validator";
import {authBusinessLayer} from "../BLL/auth-BLL";
import {usersLoginValidation1, usersEmailValidation1, usersPasswordValidation} from "../middleware/input-validation-middleware";
import {jwtService} from "../application/jwt-service";



export const authRouter = Router({})

//AUTH
authRouter.post('/',
    oneOf([usersLoginValidation1, usersEmailValidation1]),
    usersPasswordValidation,
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
        let {loginOrEmail, password} = req.body
        //BLL
        const user = await authBusinessLayer.IsUserExist(loginOrEmail, password)
        debugger
        //RETURN
        if (typeof (user) !== "number") {
            const token = await jwtService.createJWT(user)
            res.status(201).send(token)
        } else {
            res.status(401)
        }

    })