const Employee = require("./Employee");

// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern extends Employee {
    constructor(name, id, email, roleName, school) {
        super(name, id, roleName, email);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
};

module.exports = Intern;