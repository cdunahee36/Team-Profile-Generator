const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(name, id, email, roleName, github) {
        super(name, id, roleName, email);
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
};

module.exports = Engineer;