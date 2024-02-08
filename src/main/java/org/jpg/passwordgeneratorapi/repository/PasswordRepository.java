package org.jpg.passwordgeneratorapi.repository;

import org.jpg.passwordgeneratorapi.entity.Password;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordRepository extends JpaRepository<Password, Long> {
    List<Password> findAllByOwnerId(Long userId);

}
