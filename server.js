const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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



const menu = () => {
    console.log("\r\n  ______                 _                       \r\n |  ____|               | |                      \r\n | |__   _ __ ___  _ __ | | ___  _   _  ___  ___ \r\n |  __| | \'_ ` _ \\| \'_ \\| |\/ _ \\| | | |\/ _ \\\/ _ \\\r\n | |____| | | | | | |_) | | (_) | |_| |  __\/  __\/\r\n |______|_| |_| |_| .__\/|_|\\___\/ \\__, |\\___|\\___|\r\n |  \\\/  |         | |             __\/ |          \r\n | \\  \/ | __ _ _ _|_| __ _  __ _ |___\/_ __       \r\n | |\\\/| |\/ _` | \'_ \\ \/ _` |\/ _` |\/ _ \\ \'__|      \r\n | |  | | (_| | | | | (_| | (_| |  __\/ |         \r\n |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|         \r\n                            __\/ |                \r\n                           |___\/                 \r\n")
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                loop: true,
                message: "What would you like to do?",
                choices: ["View all departments","View all roles","Add a department"
            , "Add a role","Add an employee","Update an employee role", "Quit"]
            }
        ]).then(answer => {
            console.log(answer)
            if(answer.choice === "View all departments"){
                viewDept();
            } else if(answer.choice === "View all roles"){
                viewRoles();
            }
        })
}

function viewDept() {
    const sql = 'SELECT * FROM department';

    db.query(sql, (err,res) => {
        if(err) throw err;
        console.table(res);
    })

}

function viewRoles() {
    const sql = 'SELECT * FROM roles';

    db.query(sql, (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    })

}
//     app.get('/api/employees', (req, res) => {


//     db.query(sql, (err,rows) => {
//         if(err){
//             res.status(500).json({ error: err.message });
//              return;
//         }       
//         res.json({
//             message: "success",
//             data: rows
//         })
//     })
//     return console.table(res);
// })

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

menu();
          message: 'success',
//             data: rows
//         });
//     });
// });

menu();
module.exports = {viewDept}