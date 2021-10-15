import { Request, Response } from "express"
import google from "../../utils/google"
module.exports = async(req:Request, res:Response) => {
    const authorizationToken = req.query.code as string
    if(!authorizationToken) return res.status(400).redirect("/login")
    const { tokens } = await google.oauthClient.getToken(authorizationToken)
    if(!tokens) return res.status(400).redirect("/login")
    google.oauthClient.setCredentials(tokens)
    res.cookie("access_token", tokens.access_token)
    res.cookie("refresh_token", tokens.refresh_token)
    res.cookie("scope", tokens.scope)
    res.cookie("token_type", tokens.token_type)
    res.cookie("expiry_date", tokens.expiry_date)
    return res.status(200).redirect("/loggedin")
}