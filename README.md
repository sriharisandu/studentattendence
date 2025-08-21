# Student Attendance Dashboard (React + Spring Boot + MySQL)

## Project Structure
```
student-attendance-app/
├── frontend-react/           # React + Vite app
└── backend-springboot/       # Spring Boot + JPA + MySQL
```

## How to Run
1) Backend
```bash
cd backend-springboot
# Edit src/main/resources/application.properties (MySQL user/pass)
mvn spring-boot:run
```
2) Frontend
```bash
cd frontend-react
npm install
npm run dev
# Open http://localhost:5173
```
Login using **teacher@school.com / password**, mark attendance, then view summary.

## Notes
- CORS already configured for `http://localhost:5173`.
- Sample data is auto-seeded.
- You can replace dummy login with a real JWT endpoint later.
