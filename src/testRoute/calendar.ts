import {
    Request,
    Response
} from "express"
import google from "../../utils/google"
module.exports = async (req: Request, res: Response) => {
    await google.calendar.calendarList.list().then((data: any) => {
        return res.json({
            Message: "Success",
            Data: data.data.items
        })
    }).catch((err: void) => {
        return res.status(400).redirect(`/checktokens?redirect_uri=/calendar`)
    })
}