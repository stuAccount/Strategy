package com.stuAccount.Strategy.eduhub.service;

import com.stuAccount.Strategy.eduhub.exception.CourseNotFoundException;
import com.stuAccount.Strategy.eduhub.model.Course;
import com.stuAccount.Strategy.eduhub.repo.CourseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepo courseRepo;

    // C
    public Course createCourse(Course course) {
        return courseRepo.save(course);
    }

    // r
    public List<Course> findAllCourses() {
        return courseRepo.findAll();
    }

    public List<Course> findCoursesByCatId(Long categoryId)  {
        return courseRepo.findCoursesByCategory_Id(categoryId);
    }


    public Course findCourseById(Long id) {
        return courseRepo.findCourseById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course by id " + id + " was not found"));
    }

    // Update
    public Course updateCourse(Long id, Course course) {
        Course updatedCourse = findCourseById(id);
        updatedCourse.setName(course.getName());
        updatedCourse.setCategory(course.getCategory());
        updatedCourse.setEpisodes(course.getEpisodes());
        return courseRepo.save(updatedCourse);
    }

    // d
    public void deleteCourse(Long id) {
        courseRepo.deleteById(id);
    }
}