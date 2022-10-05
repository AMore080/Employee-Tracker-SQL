INSERT INTO department (dept_name)
VALUES ("Engineering"),
("Accounting"),
("Customer Service");

INSERT INTO roles (title,salary,department_id)
VALUES ('Engineer','200000',1),
("Finance Advisor","1000000",2);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ('Nydia','Duron',1,0),
('Joe','Kope',2,1),
('Alex','Moreno',1,0);
