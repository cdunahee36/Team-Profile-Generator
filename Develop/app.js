const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./output/htmlRenderer");
const Employee = require("./lib/Employee");
const { start } = require("repl");
const { EPERM } = require("constants");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

//App Start
startPrompt();

//This function promts the user for their unique member question
function getQuestion(roleName) {
  switch (roleName) {
    case "Engineer": 
      return "What is your github email?"
    
    case "Intern":
      return "What school do you go to?"

    case "Manager":
      return "What is your office number?"
    
    default: 
      return "You need to choose a role"
  }
}

//this function creates a new employee object from user input
function getNewEmployee(employeeData, roleName, uniqueValue) {
  switch (roleName) {
    case "Engineer": 
      const engineer = new Engineer(employeeData.name, employeeData.id, employeeData.email)
      engineer.github = uniqueValue
      
    
      return engineer

    case "Intern":
      const intern = new Intern(employeeData.name, employeeData.id, employeeData.email)
      intern.school = uniqueValue
      

      return intern

    case "Manager":
      const manager = new Manager(employeeData.name, employeeData.id, employeeData.email)
      manager.officeNumber = uniqueValue
      
      
      return manager
    
    default: 
      return new Employee(employeeData)
  }
}

//This function asks the user questions for the members
function startPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please input member name.',
      name: 'name',
    },
    {
      type: 'input',
      message: 'Please input member email.',
      name: 'email',
    },
    {
      type: 'input',
      message: 'Please input member id.',
      name: 'id',
    },
    {
      type: 'checkbox',
      message: 'Please input member role.',
      name: 'role',
      choices: ['Engineer', 'Intern', 'Manager']
    }

    //This .then asks the user the special question
  ]).then((employeeResponse) => {
    const roleName = employeeResponse.role[0]
    inquirer.prompt([
      {
        type: 'input',
        message: getQuestion(roleName),
        name: 'uniqueValue'
      }
    ]) .then((uniqueResponse) => {
      const data = {"name": employeeResponse.name, "id": employeeResponse.id, "email": employeeResponse.email}
      const employee = getNewEmployee(data, roleName, uniqueResponse.uniqueValue)
      employees.push(employee)
      promptForMore()
    });
  });
}

//This function either writes the file or allows the user to add another member
function promptForMore() {
  inquirer.prompt([
    {
      type: 'confirm',
      message: 'Would you like to add another employee?',
      name: 'addMore'
    }
    
  ]).then((response) => {
    if (response.addMore == true) {
      startPrompt()
    } else {
      fs.writeFile(outputPath, render(employees), (err) =>
        err ? console.error(err): console.log('Success!')
    );
    }
  });
}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
