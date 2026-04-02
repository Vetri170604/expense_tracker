package com.example.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.tracker.model.User;
import com.example.tracker.Repositary.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Login
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {

            User u = existingUser.get();

            if (u.getPassword().equals(user.getPassword())) {
                return "LOGIN_SUCCESS";
            } else {
                return "INVALID_PASSWORD";
            }

        } else {
            return "USER_NOT_FOUND";
        }
    }
}