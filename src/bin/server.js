const app = require("../index");

var port = normalizePort(process.env.PORT || '3034');
//Poe o servidor para rodar ma porta especificada
app.listen(port, function () {
    console.log("Servidor online rodando na porta: " + port);
});

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