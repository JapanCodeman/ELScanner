// const express = require('express');
// const port = process.env.PORT || 8080;
// const app = express();

// app.use(express.static(__dirname + '/dist/'));
// app.get(/.*/, function (req, res) {
//   res.sendFile(__dirname + '/dist/index.html');
// })
// app.listen(port);

// console.log("server started");


// .get from old; rest from new
// const express = require('express');
// const favicon = require('express-favicon');
// const path = require('path');
// const port = process.env.PORT || 8080;
// const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));
// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/ping', function (req, res) {
//   return res.send('pong');
// });
// app.get(/.*/, function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// })
// app.listen(port);

// original below
// const express = require('express');
// const favicon = require('express-favicon');
// const path = require('path');
// const port = process.env.PORT || 8080;
// const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));
// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/ping', function (req, res) {
//   return res.send('pong');
// });
// app.get('*', function (req, res) {
//   return './public/'
//   // res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.listen(port);