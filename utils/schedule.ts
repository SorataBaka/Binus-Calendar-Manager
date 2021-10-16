import axios from "axios"
const bearer = process.env.BEARER as string
const headers = {
    "academiccareer": "RS1",
    "accept": "application/json",
    "authorization": bearer,
    "content-type": "application/json",
    "institution": "BNS01",
    "roid": "1a9be1f8-2a2b-4669-a548-4b24b9e44f35",
    "roleid": "4bcb81bd-46a8-4a09-a923-5e812cb7007b",
    "rolename": "Student",
}
const roleActivity = {
    "roleActivity" : [
        {
            "academicCareer": "RS1",
            "institution": "BNS01",
        }
    ]
}
const schedule = async(year:number, month:number, day:number) =>{
    if(!year && !month && !day){
        const currentDate = new Date().toLocaleString("id-ID", {timeZone: "Asia/Jakarta"})
        year = parseInt(currentDate.split(" ")[0].split("/")[2])
        month = parseInt(currentDate.split(" ")[0].split("/")[1])
        day = parseInt(currentDate.split(" ")[0].split("/")[0])
    }
    var error:any;
    if(isNaN(year) || isNaN(month) || isNaN(day)) throw "Invalid data type for schedule function."
    const fullDate = `${year}-${month}-${day}`
    const schedule = await axios.request({
        method: "POST",
        url: `https://func-bm7-schedule-prod.azurewebsites.net/api/Schedule/Month-v1/${fullDate}`,
        headers: headers,
        data: roleActivity

    }).then((data:any):any => {
        if(data) return data.data
        if(!data) return error
    }).catch((err:any) => {
        console.log(err)
        return error
    })
    return schedule
}

export default schedule