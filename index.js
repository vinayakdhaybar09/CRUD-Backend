const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2")



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "******",
    database: "crud_contact",
})
db.getConnection((err)=>{
    if (err) {
        console.log('Error connecting to MySQL database:', err);
    }
    console.log('Connected to MySQL database.')
})

// db.connect((err) => {
//     if (err) {
//         console.log('Error connecting to MySQL database:', err);
//     }
//     console.log('Connected to MySQL database.')
// })



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
    // connectDatabase()
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        // console.log("error", error);
        // console.log("result", result);
        res.send(result)
    })
})

app.post('/api/post', (req, res) => {
    const { name, email, contact } = req.body
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)"
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error.message);
        }
        // res.send(result)
    })
})

app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?"
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})


app.get('/api/get/:id', (req, res) => {
    const { id } = req.params
    const sqlget = "SELECT * FROM  contact_db WHERE id = ?"
    db.query(sqlget, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result)
    })
})

app.put('/api/put/:id', (req, res) => {
    const { id } = req.params
    const { name, email, contact } = req.body
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result)
    })
})

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('raj', 'raj@gmail.com', 1122334455)";
    // db.query(sqlInsert,(err, result)=>{
    //     console.log("error", err);
    //     console.log("result", result);
    // })
    // res.send("Hello vinayak")
})

app.listen(5000, () => {
    console.log("server is running on port 5000");
})
