package com.example.tracker.Repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tracker.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}