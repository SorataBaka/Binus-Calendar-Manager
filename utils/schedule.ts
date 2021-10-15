import axios from "axios"
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
        // mode: "cors",
        // referrer: "https://newbinusmaya.binus.ac.id/",
        // referrerPolicy: "strict-origin-when-cross-origin",
        headers: this.headers,
        data: this.roleActivity

    }).then((data:any):any => {
        if(data) return data.data
        if(!data) return error
    }).catch((err:any) => {
        console.log(err)
        return error
    })
    return schedule[0]?.Schedule
}

export default schedule