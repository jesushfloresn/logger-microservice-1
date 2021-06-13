DROP TABLE IF EXISTS Employee;

CREATE TABLE Employee(
 id int PRIMARY KEY,
 name text not null,
 rollnumber int not null
);

INSERT INTO Employee VALUES (1,'uzma', 1000), (2,'abdul', 1000), (3,'Hamna', 2000), (4,'fatima', 2000), (5,'shiza', 3000), (6,'javeria', 3000);
