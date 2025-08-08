const express = require('express');
const Qrcode = require('qrcode');
const Path = require('path');

const app = express();

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/qrcode', (req, res) => {
    const url = req.body.url;
    Qrcode.toDataURL(url, (err, QRUrl) => {
        if (err) {
            res.send("Error generating QR code");
        }
        res.render('qr.ejs', { QRUrl })
    })
})


app.get('/qrcode', (req, res) => {
    res.render("form.ejs");
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});