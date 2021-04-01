const functions = require('firebase-functions');
const express = require('express');
const getPropertyData = require('./getPropertyData');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://property-scrapper-pmg.web.app'
}))

app.get('/getPropertyData', async (req, res) => {
    res.set('Cache-Control', 'public, max-age=10000, s-maxage=20000')
    if (req.query.url) {
        const data = await getPropertyData(req.query.url);
        res.send(data)
    } else {
        res.send('Incorrect Parameters')
    }
})

exports.app = functions.https.onRequest(app);
