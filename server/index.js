import express from "express";
import mysql from "mysql";
import cors from "cors";
import { db } from "./connect.js";
const app = express()


//middlewares
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });


app.get("/", (req, res) => {
  console.log("hello server");
  res.json("hello server");
});
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Connected to MySQL!');
});
app.get("/books", (req, res) => {
  const quary = "SELECT * FROM books";
  db.query(quary, (err, data) => {
    if (err) return res.json(err.message)
    return res.json(data);
  })
})

app.post("/books", (req, res) => {
  const quary = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?) ";
  // console.log(req.body);

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ];
  db.query(quary, [values], (err, data) => {
    if (err) {
      return res.json(err)
    }
    return res.json(data)
  })

  // res.json("y");
})


app.listen(8800, () => {
  console.log("server is runing");
})

