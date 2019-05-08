const express = require('express');
const mysql = require('sync-mysql');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var expressValidator = require('express-validator');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const http = require('http');
const socketIO = require('socket.io');

const fs = require('fs');

var app = express();
app.set('view engine', 'ejs');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const {getGamePage,getCompanyPage, getCommentsPage} = require('./routes/index');
 const Company = require("./routes/Company");
 const Game = require("./routes/game");
 const Comment = require("./routes/Comment");
 var m_object = new Company();

 const { login, register } = require('./routes/auth');
 const jwtMW = exjwt({
     secret: 'super secret'
 });

// Some server info
const port = 8080;

// Some data to create a connection to the database
const databaseName = 'series';

// Some information for routing
const indexRoute = 'index';
const tableRoute = 'table';
const db_location = './public/create_tables.sql';


// Status messages
const internalErrorMessage = 'Oops, some internal issues occured... Please, try again!';

// Logs
const serverLog = `Server started on port ${port}.`;
const connectionLog = 'MySql database was connected.';



app.use(fileUpload()); // configure fileupload
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Some information for UI
/*const upCaseDataBase = databaseName[0].toUpperCase() + databaseName.slice(1);
const opInsert = 'Insert';
const opUpdate = 'Update';*/

//const connectionString = 'mysql://root:root@192.168.99.100:3307/series_db?charset=utf8_general_ci&timezone=-0700';
//var db = mysql.createConnectionSync(connectionString);
const db = new mysql ({
    host: '192.168.99.100',
    port:3307,
    user: 'root',
    password: 'root',
    database: 'series_db'
});
/*
db.connect((err) => {
    if (err) {
        throw(err);
    }
    console.log(connectionLog);
});*/


/*
const sqlFile = fs.readFileSync(db_location).toString();
const arrSql = sqlFile.split('\r\n\r\n');
for (let i in arrSql) {
    const query = db.query(arrSql[i], (err, results) => {
        if (err) {
            throw(err);
        }
    });
}

*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg   : msg,
        value : value
    };
  }
}));
let m_company = new Company();
let m_game =  new Game();
let m_comment = new Comment();
/*
app.get('/', function(req, res){
		m_object = new Company();
		getCompanyPage(req, res);
	});
app.get('/Games', function(req, res){
		m_object = new Game();
		getGamePage(req, res);
	});
app.get('/Comments', function(req, res){
		m_object = new Comment();
		getCommentsPage(req, res);
    });
app.get('/:id', function(req, res){
		m_object = new Company();
		m_object.GetWithId(req,res);
    });
app.get('/Games:id', function(req, res){
		m_object = new Game();
		m_object.GetWithId(req,res);
	});

app.get('/Games/add',function(req, res){ m_game.AddPage(req,res);});
app.get('/Comments/add',function(req, res){ m_comment.AddPage(req,res);});
app.get('/add',function(req, res){ m_company.AddPage(req,res);});

app.get('/delete/:id', function(req, res){m_company.Delete(req, res);});
app.get('/Games/delete/:id', function(req, res){m_game.Delete(req, res);});
app.get('/Comments/delete/:id', function(req, res){m_comment.Delete(req, res);});

app.post('/Games/add',function(req, res){ m_game.Add(req,res);});
app.post('/Comments/add',function(req, res){ m_comment.Add(req,res);});
app.post('/add',function(req, res){ m_company.Add(req,res);});

app.get('/Games/edit/:id',function(req, res){ m_game.EditPage(req,res);});
app.get('/Comments/edit/:id',function(req, res){ m_comment.EditPage(req,res);});
app.get('/edit/:id',function(req, res){ m_company.EditPage(req,res);});

app.post('/Games/edit/:id',function(req, res){ m_game.Edit(req,res);});
app.post('/Comments/edit/:id',function(req, res){ m_comment.Edit(req,res);});
app.post('/edit/:id',function(req, res){ m_company.Edit(req,res);});

app.get('/sign_in',function(req, res){ m_user.SignInPage(req,res);});
app.post('/sign_in',function(req, res){ m_user.SignIn(req,res);});
app.get('/sign_out',function(req, res){ m_user.SignOut(req,res);});
*/
app.post('/login', login);
app.post('/register', register);

global.db = db;


const server = http.createServer(app);
const io = socketIO(server);
var count = 0;
io.on('connection', socket => {
    console.log('User connected')
    var socketID = socket.conn.id;
    console.log('Connection:', socketID);
    //console.log('function:',getCompanyPage());
    socket.emit('Company',getCompanyPage());
    socket.emit('Games', getGamePage());
    socket.emit('Comments', getCommentsPage());



    socket.on('get Company',() =>{
        socket.emit('Company', getCompanyPage());
    });

    socket.on('get Games',() =>{
        socket.emit('Games', getGamePage());
    });

    socket.on('get Comments',() =>{
        socket.emit('Comments', getCommentsPage());
    });





    socket.on('add Company',(company) =>{
        m_company.Add(company);
        socket.emit('Company', getCompanyPage());
    });

    socket.on('add Games',(games) =>{
        m_game.Add(games);
        socket.emit('Games', getGamesPage());
    });

    socket.on('add Comments',(comments) =>{
        m_comment.Add(comments);
        socket.emit('Comments', getCommentsPage());
    });





    socket.on('edit Games',(games) =>{
        m_game.Edit(games);
        socket.emit('Games', getGamesPage());
    });

    socket.on('edit Comments',(comments) =>{
        m_comment.Edit(comments);
        socket.emit('Comments', getCommentsPage());
    });
    

    socket.on('get reader',() =>{
        count++;
        socket.emit('reader', count);
    });





    socket.on('delete Company',(id) =>{
        m_company.Delete(id);
        socket.emit('Company', getCompanyPage());
    });

    socket.on('delete Games',(id) =>{
        m_game.Delete(id);
        socket.emit('Games', getGamesPage());
    });

    socket.on('delete Comments',(id) =>{
        m_comment.Delete(id);
        socket.emit('Comments', getCommentsPage());
    });
    

    io.sockets.on('disconnect', () =>{
        console.log('user disconnected');
        io.sockets.removeAllListners();
    })
});

app.listen(port, () => {
    console.log(serverLog);
});;

server.listen(8081, () => console.log(`Listening on port 3001`));
