package com.example.attendance.repo;

import com.example.attendance.model.Attendance;
import com.example.attendance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    List<Attendance> findByStudentTeacherId(Long teacherId);
    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);
}
