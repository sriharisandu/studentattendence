package com.example.attendance.web.dto;

public record AttendanceSummaryItem(Long studentId, String studentName, long totalSessions, long presentCount, int percentage) {}
