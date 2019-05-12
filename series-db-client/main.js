const express = require('express');
var app = express();
const mysql = require('sync-mysql');
const bodyParser = require('body-parser');

var expressValidator = require('express-validator');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./routes/schema');


const fs = require('fs');


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
global.db = db;
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

app.post('/login', login);
app.post('/register', register);

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.listen(port, () => {
    console.log(serverLog);
});;

