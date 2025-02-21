# employee_tracker

# Description

As a developer, I aim to create a command-line application using SQL that offers a user-friendly interface to interact with an employee databases. This application, built on Node, allows you to efficiently manage employee data. It provides easy access to important information such as departments, job roles, salaries, and employee details

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Tests](#tests)
* [Questions](#questions)

## Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd employee-tracker
    ```

2. Install dependencies:
    ```bash
    npm install
    npm install inquirer
    npm install pg
    ```

3. Set up the database:
    - Ensure PostgreSQL is installed and running.
    - Create a database named `employee_tracker`.
    - Run the schema and seed files to set up the database structure and initial data:
        ```bash
        psql -U postgres -d employee_tracker -f db/schema.sql
        psql -U postgres -d employee_tracker -f db/seeds.sql


## Usage
1. Start the application:
    ```bash
    npm start
    ```

2. Follow the prompts to manage employees, roles, and departments.

Walkthrough Video: 


## License

This project is licensed under the MIT license.


## Questions

If you have any questions, please feel free to contact me at jacquilyn.fletcher89@gmail.com. You can also find more of my work at [Jacquilyn-F](https://github.com/Jacquilyn-F).












        ```

