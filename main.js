const TelegramBot = require("node-telegram-bot-api")

const token = "7383953932:AAGxo8GSNSnJ1MfUt9p1XrGhVhlMB-4h5u0"

const options = { 
    polling: true
}

const naaajuuubot = new TelegramBot(token, options)

// naaajuuubot.on("message", (callback) => {
//     const id = callback.from.id
//     naaajuuubot.sendMessage(id, callback.text)
// }) 

const prefix = "."

const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)

naaajuuubot.onText(sayHi, (callback) => {
    naaajuuubot.sendMessage(callback.from.id, "Halo juga")
})


naaajuuubot.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {Infogempa: { 
        gempa : {
            Jam, Magnitude, Tanggal, Wilayah, Potensi, Dirasakan, Kedalaman, Shakemap 
    }}} = await apiCall.json()

    const BMKGImage = BMKG_ENDPOINT + Shakemap 

    const resultText = `
    Waktu: ${Tanggal} | ${Jam}
    Besaran: ${Magnitude} SR
    Wilayah: ${Wilayah}
    Potensi: ${Potensi}
    Kedalaman: ${Kedalaman}
    `
    // console.log
    // naaajuuubot.sendMessage(callback.from.id, resultText)
    naaajuuubot.sendPhoto(callback.from.id, BMKGImage, {
        caption: resultText
    })
})