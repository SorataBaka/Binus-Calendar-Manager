import express from "express"
import { Request, Response } from "express-serve-static-core"
import path from "path"
import morgan from "morgan"
import router from "./src/router"
import cookieParser from "cookie-parser"
import google from "./utils/google"

require("dotenv").config()



const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))
app.use("/", router)
app.all("/", (req:Request, res: Response) => {
    const { cookies } = req;
    if(cookies.tokens) {
        google.oauthClient.setCredentials(cookies.tokens)
        return res.sendFile(path.resolve(__dirname + "/staticpage/indexLogged.html"))
    }
    return res.sendFile(path.resolve(__dirname + "/staticpage/indexUnloggedin.html"))
})
app.listen(3000, () => {
    console.log("Listening to port 3000")   
})