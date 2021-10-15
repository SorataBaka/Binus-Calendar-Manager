import google from "./google"
const writeEvent = async(endTime:string, startTime:string, description:string, summary:string) => {
    await google.calendar.events.insert({
        calendarId:"primary",
        requestBody: {
            end: {
                dateTime: endTime,
                timeZone: "Asia/Jakarta"
            },
            start: {
                dateTime: startTime,
                timeZone: "Asia/Jakarta"
            },
            description: description,
            summary: summary
        }
    }).then((data:any)=>{
        return data
    }).catch((err:any)=>{
        return err
    })
}
export default writeEvent