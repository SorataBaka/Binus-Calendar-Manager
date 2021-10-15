import express from "express"

const baseRouter = express.Router()
baseRouter.get("/login", require("./login/login"))
baseRouter.get("/callback", require("./callback/callback"))
baseRouter.get("/calendar", require("./testRoute/calendar"))
baseRouter.get("/loggedin", require("./interface/loggedin"))
baseRouter.get("/insert", require("./testRoute/create"))
baseRouter.get("/checktokens", require("./checktokens/checktokens"))
baseRouter.get("/parseschedule", require("./functions/parseschedule"))

export default baseRouter