import google from "./google"
export interface WriteParameters {
    calendarId: string | "primary"
    endTime:string,
    startTime:string,
    description:string,
    summary:string
}


const writeEvent = async(PARAMETER:WriteParameters) => {
    var color = Math.floor(Math.random() * 11).toString()
    await google.calendar.events.insert({
        calendarId:"primary",
        requestBody: {
            end: {
                dateTime: PARAMETER.endTime,
                timeZone: "Asia/Jakarta"
            },
            start: {
                dateTime: PARAMETER.startTime,
                timeZone: "Asia/Jakarta"
            },
            description: PARAMETER.description,
            summary: PARAMETER.summary,
            colorId: color,
        }
    }).then((data:any)=>{
        return data
    }).catch((err:any)=>{
        console.log(err)
        return err
    })
}
export default writeEvent