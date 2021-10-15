import { Request, Response } from "express"
import google from "../../utils/google"
module.exports = async(req:Request, res:Response) => {
    const { redirect_uri } = req.query
    if(!redirect_uri) return res.status(400).json({Status: 400, Message: "Invalid parameters"})
    const { cookies } = req
    if(!cookies.tokens) return res.status(400).redirect(`/login?redirect_uri=${redirect_uri}`)
    google.oauthClient.setCredentials(cookies.tokens)
    return res.status(200).redirect(redirect_uri as string )
}