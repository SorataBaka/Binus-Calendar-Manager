import { Request, Response } from "express"
import google from "../../utils/google"
module.exports = async(req:Request, res:Response) => {

    const insert = await google.calendar.calendars.insert({
        requestBody: {
            summary: "Test Calendar"
        }
    }).catch((err:void)=>{
        return res.status(400).redirect(`/checktokens?redirect_uri=/create`)
    })
    console.log(insert)
    return res.json({insert})

}