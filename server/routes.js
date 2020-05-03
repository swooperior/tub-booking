// This is the routes.js file!

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: '',
  user: '',
  password: '',
  database: '',
  port: '3306',
  dateStrings: 'true',
  debug    : 'true'
});

// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();

app.use(bodyParser.json());

//Test route to ensure database connection
app.get('/', function(req,res){
  connection.getConnection(function (err, connection) {
    //console.log(connection);
    //console.log(err);
    connection.destroy();
     
  });
});

//-------------------------------------------------------------------------
//-------------CRUD OPERATIONS------------------   CRUD = HTTP = SQL
//-------------------------------------------------------------------------
//-----------CREATE OPERATIONS------------------ Create = Post = INSERT

//add customer
app.post('/customers', (req, res, next) => {
  connection.getConnection(function (err, connection) {
    if(err){
      next(err);
    }
    const {customer} = req.body;
    console.log(customer);
    
    connection.query(`INSERT INTO customers(fname,lname,address,phone) VALUES('${customer.fname}','${customer.lname}','${customer.address}','${customer.phone}')`, function (error, results) {
      res.status(201).send({status: "Okay!"});
      connection.destroy();
    });
  });
});

//add inventory
app.post('/inventory', (req, res, next) => {
  connection.getConnection(function (err, connection) {
    if(err){
      next(err);
    }
    const {item} = req.body;
    console.log(item);
    
    connection.query(`INSERT INTO inventory(name,description) VALUES('${item.name}','${item.description}')`, function (error, results) {
      res.status(201).send({status: "Okay!"});
      connection.destroy();
    });
  });
});

//add booking
app.post('/booking', (req, res, next) => {
  connection.getConnection(function (err, connection) {
    if(err){
      next(err);
    }
    const {booking} = req.body;
    console.log(booking);
    
    connection.query(`INSERT INTO bookings(i_id,c_id,start_date,end_date,date_booked) VALUES('${booking.i_id}','${booking.c_id}','${booking.start_date}','${booking.end_date}','${booking.date_booked}')`, function (error, results) {
      res.status(201).send({status: "Okay!"});
      connection.destroy();
    });
  });
});

//-----------READ OPERATIONS------------------ Read = Get = SELECT

// GET ALL CUSTOMERS
app.get('/customers', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
      if(err){
        console.log(err);
      }
    // Executing the MySQL query (select all data from the 'customers' table).
    connection.query('SELECT * FROM customers', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
      connection.destroy();
     
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
    res.send(results);
    connection.destroy();
     
    });
  });
});


// GET ALL INVENTORY
app.get('/inventory', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    if(err){
      console.log(err);
    }
  // Executing the MySQL query .
    connection.query('SELECT * FROM inventory', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results);
    connection.destroy();
     
    });
  });
});

// --GET AVAILABLE INVENTORY
app.get('/inventory/check/', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    if(err){
      console.log(err);
    }
    var startDate = req.query.s;
    var endDate = req.query.e;
  // Executing the MySQL query 
    connection.query("SELECT * FROM inventory WHERE inventory.id NOT IN (SELECT i_id FROM bookings WHERE bookings.start_date < DATE('"+endDate+"') AND bookings.end_date > DATE('"+startDate+"'))", function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results);
    connection.destroy();
     
    });
  });
});

// GET ALL BOOKINGS
app.get('/bookings/', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
  connection.query('SELECT bookings.id, bookings.status, bookings.start_date, bookings.end_date, bookings.date_booked, customers.fname, customers.lname, customers.address, customers.phone, customers.geocode, inventory.name, inventory.description FROM bookings INNER JOIN customers ON bookings.c_id = customers.id INNER JOIN inventory ON bookings.i_id = inventory.id ORDER BY date_booked DESC', function (error, results, fields) {

    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results);
    connection.destroy();
     
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
    connection.destroy();
     
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
    res.send(results);
    connection.destroy();
     
    });
  });
});

// GET ALL TASKS FOR TODAY
//Should return bookings who's start or end dates match today's date. (start dates should be deliveries, end dates are collections)
app.get('/tasks/', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
    connection.query('SELECT bookings.id, bookings.status, bookings.start_date, bookings.end_date, bookings.date_booked, customers.fname, customers.lname, customers.address, customers.phone, customers.geocode, inventory.name, inventory.description FROM bookings INNER JOIN customers ON bookings.c_id = customers.id INNER JOIN inventory ON bookings.i_id = inventory.id WHERE (DATE(`start_date`) <= CURDATE() AND bookings.status < 1) OR (DATE(`end_date`) <= CURDATE() AND bookings.status < 3) OR ((bookings.status = 3 OR bookings.status = 1) AND (DATE(`end_date`) = CURDATE() OR DATE(`start_date`) = CURDATE())) ORDER BY CASE WHEN bookings.status = 0 AND bookings.start_date = CURDATE() THEN "1" WHEN bookings.status = 2 THEN "2" WHEN bookings.status = 3 THEN "4" ELSE "3" END ASC ', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results);
    connection.destroy();
     
    });
  });
});


// GET TASKS matching id
//Should return bookings who's start or end dates match today's date. (start dates should be deliveries, end dates are collections)
app.get('/task/:id', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Executing the MySQL query 
    connection.query('SELECT bookings.id, bookings.status, bookings.start_date, bookings.end_date, bookings.date_booked, customers.fname, customers.lname, customers.address, customers.phone, customers.geocode, inventory.name, inventory.description FROM bookings INNER JOIN customers ON bookings.c_id = customers.id INNER JOIN inventory ON bookings.i_id = inventory.id WHERE bookings.id ='+req.params.id, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results);
    connection.destroy();
     
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
    res.send(results);
    connection.destroy();
     
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
    res.send(String("Booking "+id+" Delivered!"));
    connection.destroy();
     
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
      if (results.changedRows > 0){
        res.send(results);
        
      }else{
        res.send(String("Nothing to update."));
      }
      connection.destroy();
       
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
    connection.destroy();
     
    });
  });
});
//-------------------------------------------------------------------------
//-----------DELETE OPERATIONS------------------ Delete = Delete = DELETE

//-------------------------------------------------------------------------






// Starting our server.
app.listen(5000, () => {
 console.log('Go to http://localhost:5000/ so you can see the data....');
 console.log('Defined GET Endpoints are:');
 console.log('/tasks,\n /bookings, /booking/<id>, /bookings/status/<status>\n /booking/id/delivered, /booking/id/collected,  /customers, /customer/<id>,\n /inventory, /inventory/check?start&end, /item/<id>,\n /staff, ');
});