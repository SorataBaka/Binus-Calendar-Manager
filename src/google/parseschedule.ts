import {
    Request,
    Response
} from "express"
import schedule from "../../utils/schedule"
import google from "../../utils/google"
import writeEvent, {
    WriteParameters
} from "../../utils/writeevent"
module.exports = async (req: Request, res: Response) => {
    const {
        year,
        month,
        day,
        calendarID
    } = req.query
    const {
        tokens
    } = req.cookies
    if (!tokens) return res.status(400).redirect(`/checktokens?redirect_uri=${req.originalUrl}`)
    google.oauthClient.setCredentials(tokens)
    if (!year || !month || !day) return res.status(400).json({
        Status: 200,
        Message: "Invalid query"
    })
    const yearInt = parseInt(year as string)
    const monthInt = parseInt(month as string)
    const dayInt = parseInt(day as string)
    const binusSchedule = await schedule(yearInt, monthInt, dayInt)
    const scheduleArray = binusSchedule
    var finishedWrite = []
    var testedSchedule = []
    for (const daily of scheduleArray) {
        const dailySchedule = daily.Schedule
        for (const schedules of dailySchedule) {
            const {
                dateStart,
                dateEnd,
                title,
                content,
                scheduleType,
                customParam,
                deliveryModeDesc
            } = schedules
            const verificationString = `${content} ${customParam.sessionNumber} ${title}`
            if (testedSchedule.indexOf(verificationString) == -1) {
                console.log(testedSchedule.indexOf(verificationString))
                console.log(`Writing for ${content} class ${title} session ${customParam.sessionNumber}`)
                const parameters: WriteParameters = {
                    calendarId: calendarID as string,
                    endTime: dateEnd,
                    startTime: dateStart,
                    description: `Class: ${title} \n Lecture: ${content} \n Session: ${customParam.sessionNumber} \n Type: ${deliveryModeDesc} \n Schedule Location: ${scheduleType}`,
                    summary: content
                }
                const writtenEvent = await writeEvent(parameters).catch((err:any) => {
                    return res.status(404).json({
                        Status: 404,
                        Message: "Failed",
                        err
                    })
                })
                finishedWrite.push(writtenEvent)
                testedSchedule.push(verificationString)
            }
        }
    }
    return res.status(200).json({Status: 200, Message: "Finished writing schedule",WrittenEvents: finishedWrite})

}