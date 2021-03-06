var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const data = require("../functions/data")
const options = data.options

const methods = require("../functions/methods")
const remplacer = methods.remplacer
const taille = methods.taille

let formidable = require('formidable')
let nomF, typeF, cheminF, tailleF

const crypto = require('crypto');

var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'dy',
    password: '1234',
    database: 'election'

})

router.get('/', function (req, res, next) {
    res.render('accueil/index', { title: 'Accueil', options: options, host: req.hostname });
});
router.get('/list', function (req, res, next) {
    con.connect(() => {
        let sql = "SELECT *FROM Electeurs"
        con.query(sql, (err, result, field) => {
            console.log(result);

            res.render('list/index', { title: 'List', host: req.hostname, list: result });
        })
    })
});

router.get('/regist', function (req, res, next) {
    res.render('regist/index', { title: 'Enregistrer', host: req.hostname });
});


router.post('/regist/add', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.multiples = false;
    form.maxFileSize = 5000 * 1024 * 1024;
    form.keepExtensions = true;
    form.uploadDir = './public/uploads';
    form.on('fileBegin', function (name, file) {
        file.name = remplacer(remplacer(remplacer(file.name, " ", "_"), "-", "_"), "–", "_")
        file.path = './public/uploads/' + file.name
    });

    form.on('file', function (name, file) {
    });

    form.parse(req, (err, fields, file) => {
        res.redirect("/regist")
    });
})

router.get("/verify/:carteElecteur", (req, res, next) => {
    let carteElecteur = req.params.carteElecteur
    con.connect(() => {
        let sql = "SELECT *FROM Electeurs WHERE carteElecteur = ?"
        con.query(sql, [carteElecteur], (err, result, field) => {
            res.render('verify/verify', { title: 'Verify', host: req.hostname, electeur: result });
        })
    })
})

router.get("/verify", (req, res, next) => {
    res.render('verify/index', { title: 'Verify', host: req.hostname });
})

router.get("/vote", (req, res, next) => {
    con.connect(() => {
        let sql = "SELECT *FROM Candidats"
        con.query(sql, (err, result, field) => {
            res.render('vote/index', { title: 'Vote', host: req.hostname, candidats: result });
        })
    })
})

router.get("/stats", (req, res, next) => {
    con.connect(() => {
        let sql = "SELECT *FROM Electeurs WHERE statusVote='oui'"
        con.query(sql, (err, result, field) => {
            let sql2 = "SELECT COUNT(*) As H FROM Electeurs WHERE sexeElecteur = ?"
            con.query(sql2,["M"], (err, result2, field) => {
                res.render('statistiques/index', { title: 'Stats', host: req.hostname, votes: result.length, nbH : result2[0].H, nbF : result.length - result2[0].H });
            })
        })
    })
})

module.exports = router;