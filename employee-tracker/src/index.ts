import inquirer from 'inquirer';
import pool, { connectToDb } from './connection';
import { 
  viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole,
  updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment, deleteRole, deleteEmployee, viewDepartmentBudget 
} from './queries';

async function startApp() {
  await connectToDb();

  while (true) {
    try {
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [  
          'View all departments',
          'View all roles',
          'View all employees',
          'View employees by manager',
          'View employees by department',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Update an employee manager',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
          'View department budget',
          'Exit',
        ],
      });

      if (action === 'Exit') {
        console.log('Goodbye!');
        await pool.end();  // Close the pool connection when exiting
        break;
      }

      switch (action) {
        case 'View all departments': await viewDepartments(pool); break;
        case 'View all roles': await viewRoles(pool); break;
        case 'View all employees': await viewEmployees(pool); break;
        case 'View employees by manager': await viewEmployeesByManager(pool); break;
        case 'View employees by department': await viewEmployeesByDepartment(pool); break;
        case 'Add a department': await addDepartment(pool); break;
        case 'Add a role': await addRole(pool); break;
        case 'Add an employee': await addEmployee(pool); break;
        case 'Update an employee role': await updateEmployeeRole(pool); break;
        case 'Update an employee manager': await updateEmployeeManager(pool); break;
        case 'Delete a department': await deleteDepartment(pool); break;
        case 'Delete a role': await deleteRole(pool); break;
        case 'Delete an employee': await deleteEmployee(pool); break;
        case 'View department budget': await viewDepartmentBudget(pool); break;
        default: console.log("Invalid action");
      }
    } catch (err) {
      console.error("An error occurred in startApp:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      } else {
        console.error("Unknown error:", err);
      }
    }
  }
}

startApp();
