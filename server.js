var express = require("express");
var app = express();

var tedious = require("tedious");
var Request = require("tedious").Request;

app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded());

var Connection = tedious.Connection;
var config = {
  server: "192.168.1.139",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "ash23579",
    },
  },
  options: {
    encrypt: false,
    database: "RealEstate",
  },
};

var server = app.listen(4545, () => {
  var host = server.address().address;
  var port = server.address().port;
});

app.get("/properties", function (req, res) {
  var connection = new Connection(config);
  connection.on("connect", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected");
      executeStatement(res);
    }
  });
  function executeStatement(res1) {
    let buffer = { result: "" };
    let request = new Request("SELECT * FROM properties", function (err) {
      if (err) {
        console.log(err);
      } else {
        res1.send(buffer.result);
        connection.close();
      }
    });
    request.on("row", function (columns) {
      columns.forEach(function (column) {
        if (column.value === null) {
          console.log("NULL");
        } else {
          buffer.result += column.value + " ";
        }
      });
      buffer.result += "<br/>";
    });

    request.on("done", function (rowCount) {
      console.log("Done is called!");
    });

    request.on("doneInProc", function (rowCount, more) {
    //   res1.json(buffer.result);
      console.log(buffer.result);
      console.log(rowCount + " rows returned");
    });

    connection.execSql(request);
  }
  connection.connect();
});
