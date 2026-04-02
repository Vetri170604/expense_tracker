package com.example.tracker.Repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tracker.model.Expense;

public interface ExpenseRepositary extends JpaRepository<Expense, Long> {

}