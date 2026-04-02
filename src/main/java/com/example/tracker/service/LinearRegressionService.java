package com.example.tracker.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.example.tracker.model.Expense;

@Service
public class LinearRegressionService {

    public double predictNextExpense(List<Expense> expenses){

        if(expenses.size() == 0){
            return 0;
        }

        double total = 0;

        for(Expense e : expenses){
            total += e.getAmount();
        }

        return total / expenses.size();
    }
}