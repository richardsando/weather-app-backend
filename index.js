const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')
app.use(cors())
dotenv.config();

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>
    res.send("Api running"))

const key = process.env.APIKEY
app.get('/api', async (req, res) => {
    try {
        const latitude = req.headers.latitude
        const longitude = req.headers.longitude
        // const dummyURI = "https://api.darksky.net/forecast/308c7509067adff6de723594f5692940/37.8267,-122.4233?units=ca"
        const response = await axios.get((`https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=ca`))
        const data = response.data
        res.send(data)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})







app.listen(port, () => console.log(`Express listening on port ${port}!`))