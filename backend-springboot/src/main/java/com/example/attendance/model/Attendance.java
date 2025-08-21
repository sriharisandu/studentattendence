package com.example.attendance.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Table(name = "attendance_record", uniqueConstraints = @UniqueConstraint(columnNames = {"student_id","date"}))
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private boolean present;

    @ManyToOne
    private Student student;
}
