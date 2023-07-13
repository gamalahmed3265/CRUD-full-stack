import express from "express";
import mysql from "mysql";
import { db } from "./connect.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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
  console.log(req);

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
})

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("server is runing");
})

