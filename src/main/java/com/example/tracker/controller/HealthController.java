package com.example.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.tracker.model.Expense;
import com.example.tracker.model.User;
import com.example.tracker.Repositary.ExpenseRepositary;
import com.example.tracker.Repositary.UserRepository;
import com.example.tracker.service.FinancialHealthService;

@RestController
@RequestMapping("/api/health")
@CrossOrigin
public class HealthController {

    @Autowired
    private ExpenseRepositary expenseRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private FinancialHealthService healthService;

    @GetMapping("/{userId}")
    public int getHealthScore(@PathVariable Long userId){

        User user = userRepo.findById(userId).orElse(null);

        List<Expense> expenses = expenseRepo.findAll();

        return healthService.calculateScore(user, expenses);
    }
}