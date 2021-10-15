import {
    google
} from "googleapis"
require("dotenv").config()
const CLIENTID = process.env.CLIENTID as string
const CLIENTSECRET = process.env.CLIENTSECRET as string
const SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events"
]

const oauthClient = new google.auth.OAuth2({
    clientId: CLIENTID,
    clientSecret: CLIENTSECRET,
    redirectUri: "http://localhost:3000/callback"
})

const calendar = google.calendar({
    version: 'v3',
    auth: oauthClient
})


export default {
    oauthClient,
    calendar,
    SCOPES
}