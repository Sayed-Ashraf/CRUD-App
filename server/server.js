const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql2")
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    const query = "SELECT * FROM Users"
    conn.execute(query, (err, data) => {
        if(err){
            res.send("Error")
        }
        else{
            res.send(data)
        }
    })
})

app.get("/read/:id", (req, res) => {
    const id = req.params.id
    const query = 'SELECT * FROM Users WHERE id = ?'
    conn.execute(query, [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while creating a user." });
          } else {
            res.json(data);
          }
    })
})

app.post("/create", (req, res) => {
  const { name, email } = req.body;
  const query = `INSERT INTO Users(name, email) VALUES (?, ?)`;
  conn.execute(query, [name, email], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while creating a user." });
    } else {
      res.json({ message: "User created successfully." });
    }
  });
});

app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id
    const query = 'DELETE FROM `users` WHERE id = ?'
    conn.execute(query, [id], (err, data) => {
        if(err){
            res.json(err)
        }
        else{
            res.json("user deleted")
        }
    })
})

app.put("/updateUser/:id" ,(req, res) => {
    const id = req.params.id
    const {name, email} = req.body
    const query = 'UPDATE users SET `name`=? ,`email`=? WHERE id = ?'
    conn.execute(query, [name, email, id],(err, data) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
})

app.listen(8001, () => {
    console.log("Server is running");
})