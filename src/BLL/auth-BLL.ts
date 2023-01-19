//Business Layer



import {usersRepository} from "../repositories/users-repository-db";
import bcrypt from "bcrypt";
import {userDataModel} from "../repositories/mongodb";


export const authBusinessLayer = {
    //Does user exist and password correct
    async IsUserExist(loginOrEmail: string, password: string): Promise<number | userDataModel> {
        //находим пользователя по логину или email
        const user = await usersRepository.FindByLoginOrEmail(loginOrEmail)
        //если такой есть то сравниваем его хэш с хэшом введенного пароля
        if (user) {
            const passwordHash = await bcrypt.hash(password, user.passwordSalt)
            if (passwordHash == user.passwordHash) {
                return user
            } else {
                return 401
            }
        } else {
            return 401
        }
    }
}

