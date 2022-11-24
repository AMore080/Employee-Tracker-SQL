const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

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

console.log("\r\n  ______                 _                       \r\n |  ____|               | |                      \r\n | |__   _ __ ___  _ __ | | ___  _   _  ___  ___ \r\n |  __| | \'_ ` _ \\| \'_ \\| |\/ _ \\| | | |\/ _ \\\/ _ \\\r\n | |____| | | | | | |_) | | (_) | |_| |  __\/  __\/\r\n |______|_| |_| |_| .__\/|_|\\___\/ \\__, |\\___|\\___|\r\n |  \\\/  |         | |             __\/ |          \r\n | \\  \/ | __ _ _ _|_| __ _  __ _ |___\/_ __       \r\n | |\\\/| |\/ _` | \'_ \\ \/ _` |\/ _` |\/ _ \\ \'__|      \r\n | |  | | (_| | | | | (_| | (_| |  __\/ |         \r\n |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|         \r\n                            __\/ |                \r\n                           |___\/                 \r\n");

const menu = () => {

    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                loop: true,
                message: "What would you like to do?",
                choices: ["View all departments","View all roles","Add a department","View all employees"
            , "Add a role","Add an employee","Update an employee role", "Quit"]
            }
        ]).then(answer => {
            console.log(answer)
            if(answer.choice === "View all departments"){
                viewDept();
            } else if(answer.choice === "View all roles"){
                viewRoles();
            } else if(answer.choice === "View all employees"){
                viewEmployees();
            } else if(answer.choice === "Add a role"){
                addRole();
            } else if(answer.choice === "Add a department"){
                addDept();
            } else if(answer.choice === "Add an employee"){
                addEmpl();
            } else if(answer.choice === "Quit"){
                return;
            }
        })
}

//------------------------------------- Retrieves sql data and displays it in a table
function viewDept() {
    const sql = 'SELECT * FROM department';

    db.query(sql, (err,res) => {
        if(err) throw err;
        console.log('\n')
        console.table(res);
    })
    menu();
}

function viewRoles() {
    const sql = 'SELECT * FROM roles LEFT JOIN department on roles.department_id = department.id';

    db.query(sql, (err,res) => {
        if(err) throw err;
        console.log('\n')
        console.table(res);
    })
    menu();
}

function viewEmployees() {
    const sql = 'SELECT * FROM employee INNER JOIN roles ON roles.id = employee.role_id';

    db.query(sql, (err,res) => {
        if(err) throw err;
        console.log('\n');
        console.table(res);
    })
    menu();
}
// ---------------------------------------------

// -----------------Functions to manipulate the data
function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Type a role"
        },
        {
            name: 'salary',
            type: 'number',
            message: 'Enter a salary'
        },
        {
            name: 'departmentID',
            type: 'number',
            message: 'Type a valid department ID'
        }
    ]).then(answer => {
        console.log(answer);
        const sql = 
        `INSERT INTO roles (title,salary,department_id) VALUES ("${answer.title}",${answer.salary},${answer.departmentID})`;

        db.query(sql , (err,res) => {
            console.log(err)
            if (err) throw err;
            console.log(chalk.blueBright("Role successfully added"));
        })
        menu();
    })
}

function addDept() {
    inquirer.prompt([
        {
            name: "dept_name",
            type: "input",
            message: "Type a department"
        }
    ]).then(answer => {
        console.log(answer);
        const sql = 
        `INSERT INTO department (dept_name) VALUES ("${answer.dept_name}")`;

        if(!answer.dept_name){
            console.log(chalk.red('Please enter a valid value'))
            console.log(chalk.red("Try again"))
        }
        else if (answer.dept_name.trim() == ""){
            console.log(chalk.red('Please enter a valid value'))
            console.log(chalk.red("Try again"))           
        } else {
            db.query(sql , (err,res) => {
                console.log(err)
                if (err) throw err;
                console.log(chalk.blueBright("Department successfully added"));
            })
        }
        menu();
    })
}

function addEmpl() {
    db.query(`SELECT * FROM roles`, (err,res) => {
        if (err) throw err;  
    inquirer.prompt([
        {
            name: "employeeFirst",
            type: "input",
            message: "Type a first name"
        },
        {
            name: "employeeLast",
            type: 'input',
            message: 'Type a last name'
        },
        {
            name: "roleID",
            type: 'rawlist',
            message: 'Please pick a role',
            choices: function(){
            const arr = [];
            for(i = 0; i < res.length; i++){
                console.log(chalk.red([i+1]) + " " + chalk.blue(res[i].title));
                arr.push(res[i].id)
            }
            return arr;
            }
        },
        {
            name: "managerID",
            type: 'confirm',
            message: 'Are you a manager?'
        }
    ]).then(answer => {
        console.log(answer);

        if(answer.managerID == true){
            answer.managerID = 1;
        } else {
            answer.managerID = 0;
            console.log(answer.managerID)
        }

        const sql = 
        `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${answer.employeeFirst}","${answer.employeeLast}",${answer.roleID},${answer.managerID})`;

        if(!answer){
            console.log(chalk.red('Please enter a valid value'))
            console.log(chalk.red("Try again"))
        } else {
            db.query(sql , (err,res) => {
                console.log(err)
                if (err) throw err;
                console.log(chalk.blueBright("Employee successfully added"));
            })
            menu();
        }
    })
    })
}


app.use((req,res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

menu();