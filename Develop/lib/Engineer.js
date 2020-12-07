const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(name, id, email, github) {
        this.roleName = "Engineer"
        super(name, id, email);
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
};

module.exports = Engineer;