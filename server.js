const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 4001;
const express = require('express');
const httpProxy = require('http-proxy');
const rxjs = require('rxjs');
const rxjsOp = require('rxjs/operators')
const { timer } = rxjs;
const { tap } = rxjsOp;

var proxy = httpProxy.createProxyServer({});
var app = express();
var util = require('util');

var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

console.log(tap);
proxy.on('error', function(e) {
    console.log(e);
});
app.use(express.static(__dirname+'/build'));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const server = app.listen(port, () => {
    console.log("la-workstation-sync --> listening at: " + port)

    const gitTimer = timer(1024, 2048).pipe(
        tap(t => console.log("GitTimer -- PING"))
    ).subscribe(() => { })

    const envTimer = timer(1024, 4096).pipe(
        tap(t => console.log("EnvTimer -- PING"))
    ).subscribe(() => { })
});