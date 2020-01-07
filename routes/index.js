var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const data = require("../functions/data")
const options = data.options

const methods = require("../functions/methods")
const remplacer = methods.remplacer
const taille = methods.taille

let formidable = require('formidable')
let nomF, typeF,cheminF,tailleF

const crypto = require('crypto');

var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'dy',
    password: '1234',
    database: 'xwork'

})

router.get('/', function (req, res, next) {
    res.render('accueil/index', { title: 'Accueil', options : options, host: req.hostname });
});
router.get('/regist', function (req, res, next) {
    res.render('regist/index', { title: 'Enregistrer',host: req.hostname });
});


router.post('/regist/add', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.multiples = false;
    form.maxFileSize = 5000 * 1024 * 1024;
    form.keepExtensions = true;
    form.uploadDir = './public/uploads';
    form.on('fileBegin', function (name, file) {
        file.name =remplacer(remplacer(remplacer(file.name," ","_"),"-","_"),"–","_")
        file.path = './public/uploads/' + file.name
    });

    form.on('file', function (name, file) {
    });

    form.parse(req,(err, fields, file)=>{
        res.redirect("/regist")
    });
})

module.exports = router;