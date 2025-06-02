package com.stuAccount.Strategy.eduhub.controller;

import com.stuAccount.Strategy.eduhub.model.Course;
import com.stuAccount.Strategy.eduhub.model.Episode;
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
public class EpisodeController {
    private final EpisodeService episodeService;
    private final CourseService courseService;

    // Create a new Episode under the course
    @PostMapping("/courses/{courseId}/episodes")
    public ResponseEntity<Episode> createEpisode(@PathVariable Long courseId, @RequestBody Episode episode) {
        Course course = courseService.findCourseById(courseId);
        episode.setCourse(course);
        Episode newEpisode = episodeService.createEpisode(episode);
        return new ResponseEntity<>(newEpisode, HttpStatus.CREATED);
    }

    // Find all the episodes
    @GetMapping("/episodes")
    public ResponseEntity<List<Episode>> getAllEpisodes() {
        List<Episode> episodes = episodeService.findEpisodes();
        return new ResponseEntity<>(episodes, HttpStatus.OK);
    }

    // Find episodes by courseId
    @GetMapping("/courses/{courseId}/episodes")
    public ResponseEntity<List<Episode>> getEpisodesByCourseId(@PathVariable Long courseId) {
        List<Episode> episodes = episodeService.findEpisodesByCourseId(courseId);
        return new ResponseEntity<>(episodes, HttpStatus.OK);
    }

    // Find an episode by episodeId
    @GetMapping("/episodes/{episodeId}")
    public ResponseEntity<Episode> getEpisodeById(@PathVariable Long episodeId) {
        Episode foundEpisode = episodeService.findEpisodeById(episodeId);
        return new ResponseEntity<>(foundEpisode, HttpStatus.OK);
    }

    // Update an episode
    @PutMapping("/episodes/{episodeId}")
    public ResponseEntity<Episode> updateEpisode(@PathVariable Long episodeId ,@RequestBody Episode episode) {
        Episode updatedEpisode = episodeService.updateEpisode(episodeId, episode);
        return new ResponseEntity<>(updatedEpisode, HttpStatus.OK);
    }

    // Delete an episode
    @DeleteMapping("/episodes/{episodeId}")
    public ResponseEntity<Void> deleteEpisode(@PathVariable Long episodeId) {
        episodeService.deleteEpisode(episodeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
