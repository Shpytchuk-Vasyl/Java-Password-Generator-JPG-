package org.jpg.passwordgeneratorapi.services;

import org.jpg.passwordgeneratorapi.entity.Password;
import org.jpg.passwordgeneratorapi.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordService {
    @Autowired
    PasswordRepository repository;

    public Password addNewPassword(Password password) {
        return repository.save(password);
    }

    public List<Password> getAllPasswordsByUserId(Long id) {
        return repository.findAllByUserId(id);
    }

    public Password editPassword(Password newPassword) {
        return repository.save(newPassword);
    }

    public void deletePasswordById(Long id) {
        repository.deleteById(id);
    }

}
