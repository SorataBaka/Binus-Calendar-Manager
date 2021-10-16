import express from "express"

const baseRouter = express.Router()
baseRouter.get("/login", require("./login/login"))
baseRouter.get("/callback", require("./callback/callback"))
baseRouter.get("/loggedin", require("./interface/loggedin"))
baseRouter.get("/checktokens", require("./checktokens/checktokens"))


baseRouter.get("/google/parseschedule", require("./google/parseschedule"))
baseRouter.get("/google/createnewcalendar", require("./google/createcalendar"))


//Test routes
baseRouter.get("/test/insert", require("./testRoute/create"))
baseRouter.get("/test/calendar", require("./testRoute/calendar"))
baseRouter.get("/test/getschedule", require("./testRoute/getschedule"))
baseRouter.get("/test/test", require("./testRoute/test"))
export default baseRouter