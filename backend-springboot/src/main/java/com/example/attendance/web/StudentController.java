package com.example.attendance.web;

import com.example.attendance.model.Student;
import com.example.attendance.repo.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Student> getByTeacher(@RequestParam(defaultValue = "1") Long teacherId){
        return studentRepository.findByTeacherId(teacherId);
    }
}
