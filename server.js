// import sslRedirect from 'heroku-ssl-redirect';
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}
app.use(favicon(__dirname + '/public/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));
// app.use(sslRedirect());
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('*', function (req, res) {
  res.sendFile(path.resolve("./build", "index.html"));
})
app.listen(port);