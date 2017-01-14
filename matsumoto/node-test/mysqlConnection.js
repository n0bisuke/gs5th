var mysql = require('mysql');

//local用
//var dbConfig = {
//    host: '127.0.0.1',
//    user: 'root',
//    password: '',
//    database: 'bulletin_board'
//};

var dbConfig = {
    host: '[host]',
    user: '[user]',
    password: '[password]',
    batabase: '[database]'
}

var connection = mysql.createConnection(dbConfig);

// これはHerokuのMySQLのためのハックです。
setInterval(function() {
  connection.query('SELECT 1');
}, 5000);

module.exports = connection;