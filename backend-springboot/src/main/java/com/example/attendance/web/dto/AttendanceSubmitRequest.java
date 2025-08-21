package com.example.attendance.web.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public record AttendanceSubmitRequest(
        @NotNull LocalDate date,
        @NotNull List<Entry> entries
) {
    public record Entry(@NotNull Long studentId, boolean present) {}
}
