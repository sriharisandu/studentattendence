# Student Attendance Backend (Spring Boot + MySQL)

## Prereqs
- Java 17
- Maven 3.9+
- MySQL running locally

Create a MySQL database and user or let Spring create it:
```sql
CREATE DATABASE IF NOT EXISTS attendance_db;
```
Update `src/main/resources/application.properties` with your MySQL username/password.

## Run
```bash
cd backend-springboot
mvn spring-boot:run
```
The app runs on `http://localhost:8080` and exposes:
- `GET /api/students?teacherId=1`
- `POST /api/attendance` (payload: `{ "date": "2025-08-20", "entries":[{"studentId":1,"present":true}] }`)
- `GET /api/attendance/summary?teacherId=1`

CORS is open to `http://localhost:5173` (the Vite dev server).

### Notes
- Auth is intentionally minimal so you can focus on the data flow. The React app uses a dummy login (email: `teacher@school.com`, password: `password`). You can later wire `/api/auth/login` and JWT easily.
- `data.sql` seeds a teacher and a few students.
