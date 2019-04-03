const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var expressValidator = require('express-validator');
const fs = require('fs');

var app = express();
app.set('view engine', 'ejs');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const {getGamePage,getCompanyPage, getCommentsPage} = require('./routes/index');
 const Company = require("./routes/Company.js");
 const Game = require("./routes/game.js");
 const Comment = require("./routes/Comment.js");
 var m_object = new Company();

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

// Some information for UI
const upCaseDataBase = databaseName[0].toUpperCase() + databaseName.slice(1);
const opInsert = 'Insert';
const opUpdate = 'Update';

const connectionString = 'mysql://root:root@192.168.99.100:3307/series_db?charset=utf8_general_ci&timezone=-0700';
var db = mysql.createConnection(connectionString);

db.connect((err) => {
    if (err) {
        throw(err);
    }
    console.log(connectionLog);
});

const sqlFile = fs.readFileSync(db_location).toString();
const arrSql = sqlFile.split('\r\n\r\n');
for (let i in arrSql) {
    const query = db.query(arrSql[i], (err, results) => {
        if (err) {
            throw(err);
        }
    });
}

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
app.get('/add',function(req, res){ m_object.AddPage(req,res);});
app.get('/delete/:id', function(req, res){m_object.Delete(req, res);});
app.post('/add', function(req, res){m_object.Add(req, res);});
app.get('/edit/:id',function(req, res){ m_object.EditPage(req,res);});
app.post('/edit/:id', function(req, res){m_object.Edit(req, res);});

global.db = db;



app.listen(port, () => {
    console.log(serverLog);
});;
