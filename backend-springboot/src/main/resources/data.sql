-- Seed sample teacher and students
INSERT INTO teacher (id, name, email, password) VALUES
  (1, 'Srihari', 'teacher@school.com', 'password')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO student (id, name, rollNo, className, teacher_id) VALUES
  (1, 'Aarav', 'R01', '10-A', 1),
  (2, 'Isha', 'R02', '10-A', 1),
  (3, 'Rohan', 'R03', '10-A', 1),
  (4, 'Diya', 'R04', '10-A', 1)
ON DUPLICATE KEY UPDATE name=VALUES(name);
