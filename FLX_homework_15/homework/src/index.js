function Company({name, owner, maxCompanySize}) {
  let _companyName = name;
  let _companyOwner = owner;
  let _maxCount = maxCompanySize;
  const employees = [];
  const companyCreateTime = new Date();
  const _logs = [`${_companyName} was created in ${companyCreateTime}`];
  const _zero = 0;
  const _one = 1;
  const _thousand = 1000;

  function getLowestSalary() {
    let lowestSalary = employees[_zero].getSalary();
    let lowestSalaryEmployee = _zero;

    for (let i = 1; i < employees.length; i++) {
      if (employees[i].getSalary() < lowestSalary) {
        lowestSalary = employees[i].getSalary();
        lowestSalaryEmployee = i;
      }
    }

    return lowestSalaryEmployee;
  }

  function getAverage(data) {
    let result = employees.reduce(function (sum, current) {
      current = current.getPersonalInfo()[data];
      return sum + current;
    }, _zero);

    return result / employees.length;
  }

  function checkEmployeeInstance(object) {
    let isInstance = object instanceof Employee;
    return isInstance || console.error('Please try to add Employee instance!');
  }

  function removeEmployeeCheck(index) {
    let idCheck = index < employees.length;
    return idCheck || console.error('There is no employee by this ID!');
  }

  this.addNewEmployee = function (employee) {
    if (checkEmployeeInstance(employee)) {
      let employeeName = employee.getPersonalInfo()._name;

      if (employees.length === _maxCount) {
        this.removeEmployee(getLowestSalary());
      }

      employee.hireTime = new Date();
      employee.hire(_companyName);
      _logs.push(`${employeeName} starts working at ${_companyName} in ${employee.hireTime}`);
      employees.push(employee);
    }
  };

  this.removeEmployee = function (index) {
    if (removeEmployeeCheck(index)) {
      let removedEmployeeName = employees[index].getPersonalInfo()._name;
      employees[index].fireTime = new Date();
      employees[index].fire(_companyName);
      _logs.push(`${removedEmployeeName} ends working at ${_companyName} in ${employees[index].fireTime}`);
      employees.splice(index, _one);
    }
  };

  this.getAverageSalary = function () {
    return getAverage('_salary');
  };

  this.getEmployees = function () {
    let employeesList = [];

    for (let i = 0; i < employees.length; i++) {
      employeesList.push(employees[i].getPersonalInfo());
    }

    return employeesList;
  };

  this.getFormattedListOfEmployees = function () {
    let formattedList = employees.map(function (employee) {
      let employeeName = employee.getPersonalInfo()._name;
      let hire = employee.hireTime.getTime();
      let timeInCompany = (Date.now() - hire) / _thousand;
      return `${employeeName} - works in ${_companyName} ${timeInCompany} seconds;`;
    });

    return formattedList.join('\n');
  };

  this.getAverageAge = function () {
    return getAverage('_age');
  };

  this.getHistory = function () {
    return _logs.join('\n');
  };
}

function Employee({name, primarySkill, age, salary}) {
  let _name = name;
  let _primarySkill = primarySkill;
  let _age = age;
  let _salary = salary;
  const _logs = [];
  const _thousand = 1000;
  this.endWorkTime = 0;

  this.getPersonalInfo = function () {
    return {_name, _primarySkill, _salary, _age};
  };

  this.getSalary = function () {
    return _salary;
  };

  this.setSalary = function (amount) {
    if (salaryChangeValidation(amount)) {
      if (amount > _salary) {
        _logs.push(`Change salary from ${_salary} to ${amount}.`);
        _salary = amount;
      } else {
        _logs.push(`Try to change salary from ${_salary} to ${amount}.`);
        console.error('Cannot set smaller salary!');
      }
    }
  };

  this.getWorkTimeInSeconds = function () {
    let experience = 0;

    if (this.companyName) {
      experience += Date.now() - this.hireTime;
    }

    experience += this.endWorkTime;
    return experience / _thousand;
  };

  this.hire = function (companyName) {
    this.companyName = companyName;
    _logs.push(`${_name} is hired to ${this.companyName} in ${this.hireTime}`);
  };

  this.fire = function () {
    this.endWorkTime += Date.now() - this.hireTime;
    _logs.push(`${_name} is fired from ${this.companyName} in ${this.hireTime}`);
    delete this.companyName;
  };

  this.getHistory = function () {
    return _logs.join('\n');
  };

  function salaryChangeValidation(amount) {
    let isValid = isFinite(amount) && parseFloat(amount) === amount;
    return isValid || console.error('Data is not valid!');
  }
}

// Test
// let artem = new Employee({name: 'Artem', age: 15, salary: 1000, primarySkill: 'UX'});
// let vova = new Employee({name: 'Vova', age: 16, salary: 2000, primarySkill: 'BE'});
// let vasyl = new Employee({name: 'Vasyl', age: 25, salary: 1000, primarySkill: 'FE'});
// let ivan = new Employee({name: 'Ivan', age: 35, salary: 5000, primarySkill: 'FE'});
// let orest = new Employee({name: 'Orest', age: 29, salary: 300, primarySkill: 'AT'});
// let anton = new Employee({name: 'Anton', age: 19, salary: 500, primarySkill: 'Manager'});
//
// let epam = new Company({name: 'Epam', owner: 'Arkadii', maxCompanySize: 5});
//
// epam.addNewEmployee(artem);
// epam.addNewEmployee(vova);
// epam.addNewEmployee(vasyl);
// epam.addNewEmployee(ivan);
// epam.addNewEmployee(orest);
// epam.addNewEmployee(anton);
//
// console.log(epam.getHistory());
//
// /*
// "Epam was created in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time)"
// "Artem starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Vova starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Vasyl starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Ivan starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Orest starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Orest ends working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Anton starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// */
//
// epam.removeEmployee(2);
//
// console.log(vasyl.getHistory());
//
// /*
// "Vasyl is hired to Epam in Tue Mar 12 2019 07:45:55 GMT+0200 (FLE Standard Time)"
// "Vasyl is fired from Epam in Tue Mar 12 2019 07:45:55 GMT+0200 (FLE Standard Time)"
// */
//
// console.log(epam.getAverageSalary()); // -> 2125
// console.log(epam.getAverageAge()); // -> 21.25
//
// epam.addNewEmployee(5, 6, 9, 5); // -> Please try to add Employee instance
//
// setTimeout(() => {
//   epam.removeEmployee(1);
//   console.log(artem.getWorkTimeInSeconds()); // -> 5.5744444444444445
// }, 5000);
//
// vova.setSalary(900);
// vova.setSalary(2200);
// console.log(vova.getHistory());
//
// /*
// "Vova is hired to Epam in Tue Mar 12 2019 08:08:48 GMT+0200 (FLE Standard Time)"
// "try to change salary from 2000 to 900"
// "change salary from 2000 to 2200"
// */
