const express = require('express');
const mysql = require('mysql2');

//Initialize express app
const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'tHeM56^yVP',
        database: 'employees_db'
    },
    console.log('Connected to employees_db database')
);

const viewDept = app.get('/api/employees', (req, res) => {
    const sql = 'SELECT * FROM department'

    db.query(sql, (err,rows) => {
        if(err){
            res.status(500).json({ error: err.message });
             return;
        }       
        res.json({
            message: "success",
            data: rows
        })
    })
})





app.use((req,res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// app.get('/api/employees',(req,res) => {
//     const sql = 'SELECT id, employee_name AS employee FROM department'
//     db.query(sql, (err,rows) => {
//         if(err){
//             res.status(500).json({error: err.message});
//              return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

module.exports = {viewDept}