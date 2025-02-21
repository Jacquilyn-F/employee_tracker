-- Insert initial data into the department table
INSERT INTO department (name) VALUES 
('Engineering'), 
('Finance'), 
('Legal');

-- Insert initial data into the role table
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('Accountant', 60000, 2),
('Lawyer', 90000, 3);

-- Insert initial data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Jim', 'Brown', 3, 1);