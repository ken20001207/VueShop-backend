var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Example Databse : Yuanlin's Aliyun RDS Database #1
var connection = mysql.createConnection({
    host: 'rm-bp1g8y2t596rw3c2i3o.mysql.rds.aliyuncs.com',
    user: 'yuanlin',
    password: 'Yuanlin1207!'
});

/* Get all items. */
router.get('/items', function(req, res, next) {

    var first = 1;

    connection = mysql.createConnection(connection.config);
    connection.connect();

    connection.query('SELECT * FROM `vueshop_demo`.`items`;', function(err, rows, fields) {

        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.write("{\"items\":[");

        Object.keys(rows).forEach(function(key) {

            var row = rows[key];

            if (!first) {
                res.write(",");
            } else {
                first = 0;
            }

            res.write(row.data);
        });
        res.write("]}");
        res.end();
    });

    connection.end();
});

/* Get item. */
router.get('/item/:id', function(req, res, next) {

    connection = mysql.createConnection(connection.config);
    connection.connect();

    connection.query('SELECT * FROM `vueshop_demo`.`items` WHERE `id`=' + req.params.id, function(err, rows) {

        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.write("{\"items\":[");

        Object.keys(rows).forEach(function(key) {

            var row = rows[key];

            res.write(row.data);
        });
        res.end();
    });

    connection.end();
});

/* Get all classes. */
router.get('/classes', function(req, res, next) {

    var first = 1;

    connection = mysql.createConnection(connection.config);
    connection.connect();

    connection.query('SELECT * FROM `vueshop_demo`.`classes`;', function(err, rows, fields) {

        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.write("{\"classes\":[");

        Object.keys(rows).forEach(function(key) {

            var row = rows[key];

            if (!first) {
                res.write(",");
            } else {
                first = 0;
            }

            res.write(row.data);
        });
        res.write("]}");
        res.end();
    });

    connection.end();
});

module.exports = router;