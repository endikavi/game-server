const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.raw();
const urlencodedParser = bodyParser.urlencoded({extended: false})

//socket.io

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.origins('*:*');
/*8080, {
  handlePreflightRequest: function (req, res) {
    var headers = {

        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Origin': req.headers.origin ,
        'Access-Control-Allow-Credentials': true
        
    };
    res.writeHead(200, headers);
    res.end();
  }
}*/
io.on('connection', function(socket){
    
    console.log('a user connected');
    
    socket.on('chat', function(msg){
        console.log('message: ' + msg);
        io.emit('chat', msg);
    });
    
    socket.on('disconnect', function(){
        
        console.log('user disconnected');
        
    });
    
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

//endika_aeg // f*****234 //conexion a la base de datos

const mongoose = require('mongoose');
const mongodbRoute = 'mongodb://game-server:game-server@ds155299.mlab.com:55299/game-db';
const port = 3001;
const mongodbOptions = {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
};

mongoose.Promise = global.Promise
const db = mongoose.connect(mongodbRoute, mongodbOptions, (err) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    app.listen(port, () => {
        console.log(`Servidor up en ${port}`);
    });
    console.log(`Conexión a mongo correcta.`)
});

//Rutas del servidor

const index = require('./routes/index');
const users = require('./routes/users');

app.use('/', index);
app.use('/', users);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// cross-domain error fix //

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
