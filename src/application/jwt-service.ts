//Presentation Layer



import jwt from 'jsonwebtoken'
import {userDataModel} from "../repositories/mongodb";

export const jwtService = {
    //create token
    async createJWT(user: userDataModel) {
        const payload = {userId: user.id,
                        login: user.login,
                        email: user.email}
        const secretOrPrivateKey = process.env.JWT_secret!
        return jwt.sign(payload, secretOrPrivateKey, {expiresIn: '1h'});
    },



    //method return user by token
    async getUserByToken(token: string) {
        try {
            const result: any = jwt.verify(token, process.env.JWT_secret!)
            return {
                userId: result.userId,
                login: result.login,
                email: result.email
            }
        } catch {
            return null
        }
    }
}