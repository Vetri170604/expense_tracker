package com.example.tracker.Repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tracker.model.CategoryLimit;

import java.util.Optional;

public interface CategoryLimitRepository 
       extends JpaRepository<CategoryLimit,Long>{

    Optional<CategoryLimit> findByCategory(String category);
}