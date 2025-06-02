package com.stuAccount.Strategy.eduhub.repo;

import com.stuAccount.Strategy.eduhub.model.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpisodeRepo extends JpaRepository<Episode, Long> {
    Optional<Episode> findEpisodeById(Long id);

    void deleteEpisodeById(Long attr0);

    List<Episode> findEpisodesByCourse_Id(Long courseId);
}
