package com.example.tracker.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.tracker.Repositary.*;
import com.example.tracker.model.*;

import java.util.List;

@Service
public class ThresholdService {

    @Autowired
    private ExpenseRepositary expenseRepo;

    @Autowired
    private CategoryLimitRepository limitRepo;

    public String checkLimit(Expense expense){

        List<Expense> expenses =
        expenseRepo.findAll();

        double total = 0;

        for(Expense e : expenses){

            if(e.getCategory().equalsIgnoreCase(
               expense.getCategory())){

                total += e.getAmount();
            }
        }

        CategoryLimit limit =
        limitRepo.findByCategory(expense.getCategory())
        .orElse(null);

        if(limit == null) return "OK";

        double newTotal = total + expense.getAmount();

        if(newTotal > limit.getMonthlyLimit())
            return "LIMIT_EXCEEDED";

        return "OK";
    }
}