import inquirer from 'inquirer';
import { pool, connectToDb } from './connection';
import { 
  viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole,
  updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment, deleteRole, deleteEmployee, viewDepartmentBudget 
} from './queries';

async function mainMenu() {
  try {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Update an employee manager',
          'View employees by manager',
          'View employees by department',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
          'View department budget',
          'Exit',
        ],
      },
    ]);

    switch (action) {
      case 'View all departments':
        await viewDepartments(pool);
        break;
      case 'View all roles':
        await viewRoles(pool);
        break;
      case 'View all employees':
        await viewEmployees(pool);
        break;
      case 'Add a department':
        await addDepartment(pool);
        break;
      case 'Add a role':
        await addRole(pool);
        break;
      case 'Add an employee':
        await addEmployee(pool);
        break;
      case 'Update an employee role':
        await updateEmployeeRole(pool);
        break;
      case 'Update an employee manager':
        await updateEmployeeManager(pool);
        break;
      case 'View employees by manager':
        await viewEmployeesByManager(pool);
        break;
      case 'View employees by department':
        await viewEmployeesByDepartment(pool);
        break;
      case 'Delete a department':
        await deleteDepartment(pool);
        break;
      case 'Delete a role':
        await deleteRole(pool);
        break;
      case 'Delete an employee':
        await deleteEmployee(pool);
        break;
      case 'View department budget':
        await viewDepartmentBudget(pool);
        break;
      case 'Exit':
        await pool.end();
        console.log('Disconnected from the database.');
        return;
    }

    mainMenu();
  } catch (err) {
    console.error('Error:', err);
    await pool.end();
    console.log('Disconnected from the database due to an error.');
  }
}

(async () => {
  await connectToDb();
  mainMenu();
})();