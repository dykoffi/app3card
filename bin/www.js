var app = require('../app');
var debug = require('debug')('serveur:server');
var https = require('https');
var fs = require('fs')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '9999');
app.set('port', port);

/**nb g
 * Create HTTP server.
 */
var options = {
    key: fs.readFileSync("/home/dy/https/server.key"),
    cert: fs.readFileSync("/home/dy/https/server.crt")

}
var server = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}
var mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'dy',
    password: '1234',
    database: 'election'
})
console.log("start on port " + port)

/**
 * function pour voir la liste des ports actifs
 */

async function listport(serial) {
    return serial.list()
}

var sp
var usb = require("usb")
var serial = require("serialport")
var io = require("socket.io").listen(server)
io.sockets.on("connection", function (socket, pseudo) {
    console.log("un user c'est connecte")
    socket.on("addcard", (tab) => {
        con.connect(() => {
            let sql = "INSERT INTO Electeurs VALUES(?,?,?,?,?,?,?,?,?,?,?)"
            con.query(sql, tab, (err, result, field) => {
                if (result) {
                    socket.emit("addok")
                }
            })
        })
    })

    usb.on("attach",()=>{
        io.emit("device")
    })
    usb.on("detach",()=>{
        io.emit("nodevice")
    })
    //serial port
    if (!(sp instanceof serial)) {
        serial.list()
            .then(ports => {
                ports.forEach(p => {
                    if (p.pnpId)
                        sp = new serial(p.path, {
                            baudRate: 115200
                        })
                });
                if (sp instanceof serial) {
                    sp.on("open", () => {
                        io.emit("device")
                        console.log("port ouvert");
                    })
                    sp.on("close", () => {
                        console.log("port fermé");
                        io.emit("nodevice")
                        sp = undefined
                    })
                    sp.on("data", (data) => {
                        console.log("data");
                        con.connect(() => {
                            let sql = "SELECT *FROM Electeurs WHERE carteElecteur = ?"
                            con.query(sql, [data.toString()], (err, result, field) => {
                                if (result.length > 0) {
                                    console.log("appel");
                                    sp.write("cardexist" + 'E')
                                    io.emit("cardexist",data.toString())
                                } else {
                                    sp.write("cardok" + 'E')
                                    io.emit("card", data.toString())
                                }
                            })
                        })
                    })
                } else {
                    io.emit("nodevice")
                }
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        console.log(sp);
        io.emit("device")
    }
})
module.exports = io