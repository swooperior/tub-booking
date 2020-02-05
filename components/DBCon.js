import mysql from 'mysql';
export default class DBCon{
    constructor(){
        var con;
        this.con = mysql.createConnection({
            host: "192.168.1.190",
            user: "root",
            password: "",
            database: "chth"
          });

          this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO staff (uname, pass) VALUES ('Admin', 'Success')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
    }
}