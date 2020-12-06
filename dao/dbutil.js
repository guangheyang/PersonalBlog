var mysql = require("mysql");

function createConnection () {
    const connection = mysql.createConnection({
        // host:'localhost',
        host: '47.95.205.216',
        port: "3306",
        user: "root",
        password: "123456",
        database: "blog"
    });
    // connection.connect();
    return connection;
}
createConnection ()
module.exports.createConnection = createConnection;
