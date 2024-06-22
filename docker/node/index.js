const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
});

const nomes = [
  "Ana",
  "Bruno",
  "Carlos",
  "Daniela",
  "Eduardo",
  "Fernanda",
  "Gabriel",
  "Helena",
  "Igor",
  "Juliana",
  "Wesley",
];

function getNomeAleatorio() {
  const indexAleatorio = Math.floor(Math.random() * nomes.length);
  return nomes[indexAleatorio];
}

app.get("/", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL);";
  connection.query(sql);
  sql = `INSERT INTO people(name) values('${getNomeAleatorio()}')`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    connection.query("SELECT name FROM people", function (err, rows) {
      if (err) throw err;

      let names = "<ul>";
      rows.forEach((row) => {
        names += `<li>${row.name}</li>`;
      });
      names += "</ul>";

      res.send(`<h1>Full Cycle Rocks!</h1><br/>${names}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
