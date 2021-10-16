import { Request, Response } from "express"
import schedule from "../../utils/schedule"
module.exports = async(req:Request, res:Response) => {
    const date = new Date().toLocaleString("id-ID", {timeZone: "Asia/Jakarta"})
    const dateYear = parseInt(date.split(" ")[0].split("/")[2])
    const dateMonth = parseInt(date.split(" ")[0].split("/")[1])
    const dateDay = parseInt(date.split(" ")[0].split("/")[0])
    const array = await schedule(dateYear, dateMonth, dateDay)

    return res.status(200).json({
        Status: 200,
        array
    })
}