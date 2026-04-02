package com.example.tracker.service;

import org.springframework.stereotype.Service;

import com.example.tracker.model.Expense;

import java.util.List;
@Service
public class NaiveBayesService {

    public String predictCategory(double amount) {
        if (amount < 200)
            return "Food";
        else if (amount < 1000)
            return "Travel";
        else
            return "Shopping";
    }
}