const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const enforce = require('express-sslify');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('*', function (req, res) {
  res.sendFile(path.resolve("./build", "index.html"));
})
app.listen(port);