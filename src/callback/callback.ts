import { Request, Response } from "express"
import { runInNewContext } from "vm"
import google from "../../utils/google"
module.exports = async(req:Request, res:Response) => {
    const authorizationToken = req.query.code as string
    if(!authorizationToken) return res.status(400).redirect("/login")
    const { tokens } = await google.oauthClient.getToken(authorizationToken)
    if(!tokens) return res.status(400).redirect("/login")
    google.oauthClient.setCredentials(tokens)
    res.cookie("tokens", tokens)
    return res.status(200).redirect("/loggedin")
}