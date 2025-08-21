package com.example.attendance.repo;

import com.example.attendance.model.Student;
import com.example.attendance.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByTeacherId(Long teacherId);
}
