package org.jpg.passwordgeneratorapi.services;

import org.jpg.passwordgeneratorapi.entity.Password;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordService {
    @Autowired
    PasswordRepository repository;

    public Password addNewPassword(Password password) throws UserNotFoundException {
        try {
            return repository.save(password);
        } catch (Exception e) {
            throw new UserNotFoundException(e);
        }
    }

    public List<Password> getAllPasswordsByUserId(Long id) {
        return repository.findAllByOwnerId(id);
    }

    public Password editPassword(Password newPassword) throws UserNotFoundException {
        return addNewPassword(newPassword);
    }

    public void deletePasswordById(Long id) {
        repository.deleteById(id);
    }

}