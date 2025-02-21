import inquirer from 'inquirer';
import { Pool } from 'pg';

async function executeQuery(pool: Pool, query: string, params: any[] = []) {
  try {
    const res = await pool.query(query, params);
    return res.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

export async function viewDepartments(pool: Pool) {
  const rows = await executeQuery(pool, 'SELECT * FROM department');
  console.table(rows);
}

export async function viewRoles(pool: Pool) {
  const rows = await executeQuery(pool, 'SELECT * FROM role');
  console.table(rows);
}

export async function viewEmployees(pool: Pool) {
  const rows = await executeQuery(pool, 'SELECT * FROM employee');
  console.table(rows);
}

export async function addDepartment(pool: Pool) {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  await executeQuery(pool, 'INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added ${name} to the database`);
}

export async function addRole(pool: Pool) {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the role:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:',
    },
  ]);
  await executeQuery(pool, 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log(`Added ${title} to the database`);
}

export async function addEmployee(pool: Pool) {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for the employee:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee (leave blank if none):',
    },
  ]);
  await executeQuery(pool, 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null]);
  console.log(`Added ${first_name} ${last_name} to the database`);
}

export async function updateEmployeeRole(pool: Pool) {
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee you want to update:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the new role ID for the employee:',
    },
  ]);
  await executeQuery(pool, 'UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log(`Updated employee's role`);
}

export async function updateEmployeeManager(pool: Pool) {
  const { employee_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee you want to update:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the new manager ID for the employee:',
    },
  ]);
  await executeQuery(pool, 'UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
  console.log(`Updated employee's manager`);
}

export async function viewEmployeesByManager(pool: Pool) {
  const { manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID to view their employees:',
    },
  ]);
  const rows = await executeQuery(pool, 'SELECT * FROM employee WHERE manager_id = $1', [manager_id]);
  console.table(rows);
}

export async function viewEmployeesByDepartment(pool: Pool) {
  const { department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID to view its employees:',
    },
  ]);
  const rows = await executeQuery(pool, 'SELECT employee.* FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = $1', [department_id]);
  console.table(rows);
}

export async function deleteDepartment(pool: Pool) {
  const { department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the ID of the department you want to delete:',
    },
  ]);
  await executeQuery(pool, 'DELETE FROM department WHERE id = $1', [department_id]);
  console.log(`Deleted department with ID ${department_id}`);
}

export async function deleteRole(pool: Pool) {
  const { role_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the ID of the role you want to delete:',
    },
  ]);
  await executeQuery(pool, 'DELETE FROM role WHERE id = $1', [role_id]);
  console.log(`Deleted role with ID ${role_id}`);
}

export async function deleteEmployee(pool: Pool) {
  const { employee_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee you want to delete:',
    },
  ]);
  await executeQuery(pool, 'DELETE FROM employee WHERE id = $1', [employee_id]);
  console.log(`Deleted employee with ID ${employee_id}`);
}

export async function viewDepartmentBudget(pool: Pool) {
  const { department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID to view its total utilized budget:',
    },
  ]);
  const rows = await executeQuery(pool, 'SELECT SUM(role.salary) AS total_budget FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = $1', [department_id]);
  console.table(rows);
}