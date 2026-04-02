package com.example.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.tracker.model.Expense;
import com.example.tracker.Repositary.ExpenseRepositary;
import com.example.tracker.service.LinearRegressionService;
import com.example.tracker.service.ThresholdService;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    @Autowired
    private ExpenseRepositary repository;

    @Autowired
    private LinearRegressionService regressionService;

    // NEW SERVICE (Limit Check)
    @Autowired
    private ThresholdService thresholdService;

    // Get all expenses
    @GetMapping
    public List<Expense> getAllExpenses(){
        return repository.findAll();
    }

    // Add expense (UPDATED)
    @PostMapping
    public String addExpense(@RequestBody Expense expense){

        String status = thresholdService.checkLimit(expense);

        repository.save(expense);

        if(status.equals("LIMIT_EXCEEDED")){
            return "LIMIT_EXCEEDED";
        }

        return "SUCCESS";
    }

    // Delete expense
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id){
        repository.deleteById(id);
    }

    // Predict next expense
    @GetMapping("/predict")
    public double predictExpense(){
        List<Expense> expenses = repository.findAll();
        return regressionService.predictNextExpense(expenses);
    }

}