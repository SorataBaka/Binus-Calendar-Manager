import { Request, Response } from "express"
import path from "path"
module.exports = async(req:Request, res:Response) => {
    return res.sendFile(path.resolve(__dirname + "/loggedin.html"))
}