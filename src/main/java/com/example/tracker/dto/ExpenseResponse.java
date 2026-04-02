package com.example.tracker.dto;

import com.example.tracker.model.Expense;

public class ExpenseResponse {

    private String status;
    private String message;
    private Expense expense;

    public ExpenseResponse(String status, String message, Expense expense) {
        this.status = status;
        this.message = message;
        this.expense = expense;
    }

    public String getStatus() { return status; }
    public String getMessage() { return message; }
    public Expense getExpense() { return expense; }
}