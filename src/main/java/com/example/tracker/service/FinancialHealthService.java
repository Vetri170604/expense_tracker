package com.example.tracker.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.tracker.model.Expense;
import com.example.tracker.model.User;

@Service
public class FinancialHealthService {

    public int calculateScore(User user, List<Expense> expenses) {

        double totalExpense = 0;
        double optionalExpense = 0;

        for (Expense e : expenses) {

            totalExpense += e.getAmount();

            if (e.getCategory().equalsIgnoreCase("Shopping") ||
                e.getCategory().equalsIgnoreCase("Travel")) {

                optionalExpense += e.getAmount();
            }
        }

        double salary = user.getSalary();

        if (salary == 0) return 0;

        double savings = salary - totalExpense;

        double savingsRatio = savings / salary;

        int score = 0;

        // Savings score
        score += (int)(savingsRatio * 40);

        // Optional expense penalty
        double optionalRatio = optionalExpense / salary;
        score += (int)((1 - optionalRatio) * 30);

        // Budget discipline
        if (totalExpense <= salary)
            score += 30;

        return Math.max(0, Math.min(score, 100));
    }
}