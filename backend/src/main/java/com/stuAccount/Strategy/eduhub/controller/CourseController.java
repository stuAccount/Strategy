package com.stuAccount.Strategy.eduhub.controller;

import com.stuAccount.Strategy.eduhub.model.Category;
import com.stuAccount.Strategy.eduhub.model.Course;
import com.stuAccount.Strategy.eduhub.model.Episode;
import com.stuAccount.Strategy.eduhub.repo.CourseRepo;
import com.stuAccount.Strategy.eduhub.service.CategoryService;
import com.stuAccount.Strategy.eduhub.service.CourseService;
import com.stuAccount.Strategy.eduhub.service.EpisodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CourseController {
    private final CourseService courseService;
    private final CategoryService categoryService;

    // Create a new Course under category
    @PostMapping("/categories/{categoryId}/courses")
    public ResponseEntity<Course> createCourse(@PathVariable Long categoryId, @RequestBody Course course) {
        Category category = categoryService.findCategoryById(categoryId);
        course.setCategory(category);
        Course newCourse = courseService.createCourse(course);
        return new ResponseEntity<> (newCourse, HttpStatus.CREATED);
    }

    // Find all the courses
    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.findAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    // Find courses by categoryId
    @GetMapping("/categories/{categoryId}/courses")
    public ResponseEntity<List<Course>> getAllCoursesByCatId(@PathVariable Long categoryId) {
        List<Course> courses = courseService.findCoursesByCatId(categoryId);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    // Find a course by courseId
    @GetMapping("/courses/{courseId}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long courseId) {
        Course foundCourse = courseService.findCourseById(courseId);
        return new ResponseEntity<>(foundCourse, HttpStatus.OK);
    }

    // Update a course
    @PutMapping("/courses/{courseId}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long courseId ,@RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(courseId, course);
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }

    // Delete a course by courseId
    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
