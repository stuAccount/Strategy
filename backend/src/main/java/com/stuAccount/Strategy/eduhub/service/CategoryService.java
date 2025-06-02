package com.stuAccount.Strategy.eduhub.service;

import com.stuAccount.Strategy.eduhub.exception.CategoryNotFoundException;
import com.stuAccount.Strategy.eduhub.model.Category;
import com.stuAccount.Strategy.eduhub.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo categoryRepo;

    // Create
    public Category createCategory(Category category) {
        return categoryRepo.save(category);
    }

    // Read
    public List<Category> findAllCategories() {
        return categoryRepo.findAll();
    }


    public Category findCategoryById(Long id) {
        return categoryRepo.findCategoryById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category by id " + id + " was not found"));
    }

    // Update
    public Category updateCategory(Long id, Category category) {
        Category updatedCategory = findCategoryById(id);
        updatedCategory.setName(category.getName());
        updatedCategory.setCourses(category.getCourses());
        return categoryRepo.save(updatedCategory);
    }

    // Delete
    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }
}
