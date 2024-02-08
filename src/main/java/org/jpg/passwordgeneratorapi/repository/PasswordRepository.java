package org.jpg.passwordgeneratorapi.repository;

import org.jpg.passwordgeneratorapi.entity.Password;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PasswordRepository extends JpaRepository<Password, Long> {
    List<Password> findAllByUserId(Long userId);

}
