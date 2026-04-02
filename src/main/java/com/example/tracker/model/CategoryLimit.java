package com.example.tracker.model;

import jakarta.persistence.*;

@Entity
public class CategoryLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    private double monthlyLimit;

    public Long getId(){ return id; }

    public String getCategory(){ return category; }
    public void setCategory(String category){ this.category = category; }

    public double getMonthlyLimit(){ return monthlyLimit; }
    public void setMonthlyLimit(double monthlyLimit){ this.monthlyLimit = monthlyLimit; }
}