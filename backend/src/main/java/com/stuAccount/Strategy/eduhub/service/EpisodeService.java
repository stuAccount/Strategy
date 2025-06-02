package com.stuAccount.Strategy.eduhub.service;

import com.stuAccount.Strategy.eduhub.exception.EpisodeNotFoundException;
import com.stuAccount.Strategy.eduhub.model.Episode;
import com.stuAccount.Strategy.eduhub.repo.EpisodeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EpisodeService {
    private final EpisodeRepo episodeRepo;

    public Episode createEpisode(Episode episode) {
        return episodeRepo.save(episode);
    }

    public List<Episode> findEpisodesByCourseId(Long courseId) {
        return episodeRepo.findEpisodesByCourse_Id(courseId);
    }

    public List<Episode> findEpisodes() {
        return episodeRepo.findAll();
    }

    public Episode findEpisodeById(Long id){
        return episodeRepo.findEpisodeById(id)
                .orElseThrow(() -> new EpisodeNotFoundException("Episode id " + id + " was not found"));
    }

    public Episode updateEpisode(Long id, Episode episode) {
        Episode updatedEpisode = findEpisodeById(id);
        updatedEpisode.setTitle(episode.getTitle());
        updatedEpisode.setUrl(episode.getUrl());
        updatedEpisode.setCourse(episode.getCourse());
        updatedEpisode.setEpisode_index(episode.getEpisode_index());
        return episodeRepo.save(updatedEpisode);
    }

    public void deleteEpisode(Long id) {
        episodeRepo.deleteById(id);
    }

}
