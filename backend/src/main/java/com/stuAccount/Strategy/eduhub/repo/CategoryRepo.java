package com.stuAccount.Strategy.eduhub.repo;

import com.stuAccount.Strategy.eduhub.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category, Long> {
    Optional<Category> findCategoryById(Long id);

    void deleteCategoryById(Long id);
}
