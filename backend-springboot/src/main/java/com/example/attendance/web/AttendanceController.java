package com.example.attendance.web;

import com.example.attendance.model.Attendance;
import com.example.attendance.model.Student;
import com.example.attendance.repo.AttendanceRepository;
import com.example.attendance.repo.StudentRepository;
import com.example.attendance.web.dto.AttendanceSubmitRequest;
import com.example.attendance.web.dto.AttendanceSummaryItem;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    public AttendanceController(AttendanceRepository attendanceRepository, StudentRepository studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Map<String, Object>> submit(@RequestBody AttendanceSubmitRequest request){
        LocalDate date = request.date();
        for(AttendanceSubmitRequest.Entry e : request.entries()){
            Student student = studentRepository.findById(e.studentId())
                    .orElseThrow(() -> new RuntimeException("Student not found: " + e.studentId()));
            Attendance record = attendanceRepository.findByStudentIdAndDate(student.getId(), date)
                    .orElse(Attendance.builder().student(student).date(date).build());
            record.setPresent(e.present());
            attendanceRepository.save(record);
        }
        return ResponseEntity.ok(Map.of("status","ok"));
    }

    @GetMapping("/summary")
    public List<AttendanceSummaryItem> summary(@RequestParam(defaultValue = "1") Long teacherId){
        // For each student of teacher, compute total and present counts
        var students = studentRepository.findByTeacherId(teacherId);
        Map<Long, List<Attendance>> grouped = attendanceRepository.findByStudentTeacherId(teacherId).stream()
                .collect(Collectors.groupingBy(a -> a.getStudent().getId()));

        List<AttendanceSummaryItem> items = new ArrayList<>();
        for(Student s: students){
            var list = grouped.getOrDefault(s.getId(), List.of());
            long total = list.size();
            long present = list.stream().filter(Attendance::isPresent).count();
            int pct = total == 0 ? 0 : (int)Math.round(present * 100.0 / total);
            items.add(new AttendanceSummaryItem(s.getId(), s.getName(), total, present, pct));
        }
        return items;
    }
}
