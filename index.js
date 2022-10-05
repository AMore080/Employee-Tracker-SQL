// const inquirer = require('inquirer');
// const cTable= require('console.table');
// const { viewDept } = require('./server');

// const menu = async() => {
//     console.log("\r\n  ______                 _                       \r\n |  ____|               | |                      \r\n | |__   _ __ ___  _ __ | | ___  _   _  ___  ___ \r\n |  __| | \'_ ` _ \\| \'_ \\| |\/ _ \\| | | |\/ _ \\\/ _ \\\r\n | |____| | | | | | |_) | | (_) | |_| |  __\/  __\/\r\n |______|_| |_| |_| .__\/|_|\\___\/ \\__, |\\___|\\___|\r\n |  \\\/  |         | |             __\/ |          \r\n | \\  \/ | __ _ _ _|_| __ _  __ _ |___\/_ __       \r\n | |\\\/| |\/ _` | \'_ \\ \/ _` |\/ _` |\/ _ \\ \'__|      \r\n | |  | | (_| | | | | (_| | (_| |  __\/ |         \r\n |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|         \r\n                            __\/ |                \r\n                           |___\/                 \r\n")
//     const choices = await inquirer
//         .prompt([
//             {
//                 name: "choice",
//                 type: "list",
//                 loop: true,
//                 message: "What would you like to do?",
//                 choices: ["View all departments","View all roles","Add a department"
//             , "Add a role","Add an employee","Update an employee role", "Quit"]
//             }
//         ])
//         console.log(choices);

//         if(choices.choice === "View all departments"){
//             console.log(cTable.getTable(res))
//             return cTable.getTable(res);
//         };
// }


// menu();