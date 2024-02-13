package org.jpg.passwordgeneratorapi.services;

import org.jpg.passwordgeneratorapi.exceptions.IncorrectPasswordException;
import org.jpg.passwordgeneratorapi.exceptions.UserIsAlreadyRegistered;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.UserRegisteredWithGoogleException;
import org.jpg.passwordgeneratorapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository repository;
    public User registerUser(User user) throws UserIsAlreadyRegistered {
        Optional<User> user1 = repository.findByEmail(user.getEmail());
        if(user1.isPresent()) throw new UserIsAlreadyRegistered("User with this email is already registered");
        return repository.save(user);
    }

    public User findUser(String email) throws UserNotFoundException {
        return repository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }

    public User findUser(Long id) throws UserNotFoundException {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }


    public void delete(Long id) {
        repository.deleteById(id);
    }

    public User login(User user) throws UserNotFoundException, UserRegisteredWithGoogleException, IncorrectPasswordException {
        User find = findUser(user.getEmail());
        if(find.getPassword() == null) {
            throw new UserRegisteredWithGoogleException();
        } else if(find.getPassword().equals(user.getPassword())){
            return find;
        } else {
            throw new IncorrectPasswordException();
        }
    }
}
