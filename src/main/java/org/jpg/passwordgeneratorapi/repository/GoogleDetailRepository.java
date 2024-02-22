package org.jpg.passwordgeneratorapi.repository;

import org.jpg.passwordgeneratorapi.entity.GoogleUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoogleDetailRepository extends JpaRepository<GoogleUser, String> {
}
