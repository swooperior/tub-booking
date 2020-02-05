// This is the routes.js file!

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chth'
});

// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();

//-------------------------------------------------------------------------
//-------------CRUD OPERATIONS------------------   CRUD = HTTP = SQL
//-------------------------------------------------------------------------
//-----------CREATE OPERATIONS------------------ Create = Post = INSERT


//-----------READ OPERATIONS------------------ Read = Get = SELECT

// GET ALL CUSTOMERS
app.get('/customers', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'customers' table).
    connection.query('SELECT * FROM customers', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});
// -- GET Single Customer matching ID
app.get('/customer/:id', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
    connection.query('SELECT * FROM customers WHERE id='+req.params.id, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});


// GET ALL INVENTORY
app.get('/inventory', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query .
    connection.query('SELECT * FROM inventory', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});

// --GET AVAILABLE INVENTORY
app.get('/inventory/check/', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var startDate = req.query.start;
    var endDate = req.query.end;
  // Executing the MySQL query 
    connection.query("SELECT * FROM `inventory` WHERE id NOT IN (SELECT i_id FROM `bookings` WHERE DATE('"+startDate+"') <= `bookings`.start_date AND `bookings`.end_date >= DATE('"+endDate+"'))", function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});

// GET ALL BOOKINGS
app.get('/bookings/', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
  connection.query('SELECT bookings.id, bookings.status, bookings.start_date, bookings.end_date, bookings.date_booked, customers.fname, customers.lname, customers.address, customers.phone, customers.geocode, inventory.name, inventory.size FROM bookings INNER JOIN customers ON bookings.c_id = customers.id INNER JOIN inventory ON bookings.i_id = inventory.id ORDER BY date_booked DESC', function (error, results, fields) {

    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});
// -- GET Single Booking matching ID
app.get('/booking/:id', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
    connection.query('SELECT * FROM bookings WHERE id='+req.params.id, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});
// -- GET Bookings matching status
app.get('/bookings/status/:status', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
  // Executing the MySQL query 
    connection.query('SELECT * FROM bookings WHERE status='+req.params.status, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});

// GET ALL TASKS FOR TODAY
//Should return bookings who's start or end dates match today's date. (start dates should be deliveries, end dates are collections)
app.get('/tasks/', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
    connection.query('SELECT bookings.id, bookings.status, bookings.start_date, bookings.end_date, bookings.date_booked, customers.fname, customers.lname, customers.address, customers.phone, customers.geocode, inventory.name, inventory.size FROM bookings INNER JOIN customers ON bookings.c_id = customers.id INNER JOIN inventory ON bookings.i_id = inventory.id WHERE (DATE(`start_date`) <= CURDATE() AND status < 1) OR (DATE(`end_date`) <= CURDATE() AND status < 3) OR ((status = 3 OR status = 1) AND (DATE(`end_date`) = CURDATE() OR DATE(`start_date`) = CURDATE())) ORDER BY CASE WHEN bookings.status = 0 AND bookings.start_date = CURDATE() THEN "1" WHEN bookings.status = 2 THEN "2" ELSE "3" END ASC', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});


// GET TASKS matching id
//Should return bookings who's start or end dates match today's date. (start dates should be deliveries, end dates are collections)
app.get('/task/:id', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
    connection.query('SELECT bookings.id, bookings.status, bookings.start_date, bookings.end_date, bookings.date_booked, customers.fname, customers.lname, customers.address, customers.phone, customers.geocode, inventory.name, inventory.size FROM bookings INNER JOIN customers ON bookings.c_id = customers.id INNER JOIN inventory ON bookings.i_id = inventory.id WHERE bookings.id ='+req.params.id, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});

// GET ALL STAFF
app.get('/staff', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
    connection.query('SELECT name FROM staff', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
    });
  });
});
//-------------------------------------------------------------------------

//-----------UPDATE OPERATIONS------------------ Update = Update = UPDATE
// Update to delivered.
app.get('/booking/:id/delivered', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var id = req.params.id;
  // Executing the MySQL query 
    connection.query('UPDATE bookings SET status = 1 WHERE id = '+id, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(String("Booking "+id+" Delivered!"))
    });
  });
});
//Update to collect - SHOULD BE TRIGGERED FROM A CRON JOB
//Will check to see if status = 1 and the end_date =< CURDATE()
app.get('/bookings/update', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
  // Executing the MySQL query 
    connection.query('UPDATE bookings SET status = 2 WHERE status = 1 AND DATE(end_date) <= CURDATE()', function (error, results, fields) {
      if (fields >= 1){
        res.send(results);
      }else{
        res.send(String("Nothing to update."));
      }
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    
    });
  });
});
//Update to Complete
app.get('/booking/:id/collected', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var id = req.params.id;
  // Executing the MySQL query 
    connection.query('UPDATE bookings SET status = 3 WHERE id = '+id, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(String("Booking "+id+" Complete!"))
    });
  });
});
//-------------------------------------------------------------------------
//-----------DELETE OPERATIONS------------------ Delete = Delete = DELETE

//-------------------------------------------------------------------------






// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/ so you can see the data....');
 console.log('Defined GET Endpoints are:');
 console.log('/tasks,\n /bookings, /booking/<id>, /bookings/status/<status>\n /booking/id/delivered, /booking/id/collected,  /customers, /customer/<id>,\n /inventory, /inventory/check?start&end, /item/<id>,\n /staff, ');
});