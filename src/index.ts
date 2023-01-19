import express, {Request, Response} from "express"
import bodyParser from "body-parser"
import cors from "cors"
import {authRouter} from "./routes/auth-router";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";
import {usersRouter} from "./routes/users-router";
import {runDb} from "./repositories/mongodb";



export const app = express()

const corsMiddleware = cors()
app.use(corsMiddleware)

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

//PORT
const port = process.env.PORT || 3000

//GREETING PAGE
app.get('/', (req: Request, res: Response) => {
    res.send(`<div style="background-color: darkorchid">
<h1 style="background-color: chartreuse">Home page<h1>
</div>`)
})

//ROUTES
app.use('/auth/login', authRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/testing', testingRouter)


//START APP FUNCTION
const startApp = async () => {
    //wait while DB is connected
    await runDb()
    //the listen port
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

//START APP
startApp();

