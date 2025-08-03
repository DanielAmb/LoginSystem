package com.simplelogin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simplelogin.models.Appointment;
import com.simplelogin.models.User;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
}
