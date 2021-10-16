import {
    Request,
    Response
} from "express"
import google from "../../utils/google"
module.exports = async (req: Request, res: Response) => {
    const { name } = req.query
    const { tokens } = req.cookies
    if (!tokens) return res.status(400).redirect(`/checktokens?redirect_uri=${req.originalUrl}`)
    google.oauthClient.setCredentials(tokens)
    if(!name) return res.status(400).json({Status:400, Message: "Invalid parameter provided"})
    await google.calendar.calendars.insert({
        requestBody: {
            summary: name as string
        }
    }).then((data:any)=> {
        return res.status(200).json({Status:200, Message: "Successfully created new calendar", data})
    }).catch((err:any)=> {
        return res.status(201).json({Status:201, Message: "Failed to create new calendar", err})
    })
}