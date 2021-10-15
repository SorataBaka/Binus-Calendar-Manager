import {
    Request,
    Response
} from "express"
// import puppeteer from "puppeteer"
import google from "../../utils/google"
module.exports = async (req: Request, res: Response) => {
    const url = google.oauthClient.generateAuthUrl({
        access_type: "offline",
        scope: google.SCOPES
    })
    return res.status(200).redirect(url)
}