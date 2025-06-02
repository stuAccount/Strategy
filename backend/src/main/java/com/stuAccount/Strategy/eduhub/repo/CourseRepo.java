package com.stuAccount.Strategy.eduhub.repo;

import com.stuAccount.Strategy.eduhub.model.Category;
import com.stuAccount.Strategy.eduhub.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepo extends JpaRepository<Course, Long> {
    Optional<Course> findCourseById(Long id);

    void deleteCourseById(Long id);

    List<Course> findCoursesByCategory_Id(Long category_id);
}
