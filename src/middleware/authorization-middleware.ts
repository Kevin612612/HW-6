//Middleware




import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersRepository} from "../repositories/users-repository-db";


//Basic Authorization

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization == 'Basic YWRtaW46cXdlcnR5') { //decoded in Base64 password
        next()
    } else {
        res.status(401).send("Unauthorized")
    }
}


//Bearer Authorization
export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) { //token is absent in headers
        res.sendStatus(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]  //token is in headers: 'bearer algorithmSecretKey.payload.kindOfHash'
    const userDecoded = await jwtService.getUserByToken(token) //get user from payload
    if (userDecoded) {
        req.user = await usersRepository.findUserByLoginOrEmail(userDecoded.login) //get user from db by user.login and take it into body
        next()
    }
    return 401 //we don't get user from headers.authorization
}
