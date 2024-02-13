package org.jpg.passwordgeneratorapi.controllers;

import jakarta.validation.Valid;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.IncorrectPasswordException;
import org.jpg.passwordgeneratorapi.exceptions.UserIsAlreadyRegistered;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.exceptions.UserRegisteredWithGoogleException;
import org.jpg.passwordgeneratorapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    UserService service;


    @GetMapping("/")
    public ResponseEntity<User> userLogIn(@RequestBody User user) throws UserNotFoundException, IncorrectPasswordException, UserRegisteredWithGoogleException {
        return ResponseEntity.ok(service.login(user));
    }


    @PostMapping("/")
    public ResponseEntity<User> registerUser(@Valid  @RequestBody User user) throws UserIsAlreadyRegistered {
        return ResponseEntity.ok(service.registerUser(User.builder()
                        .password(user.getPassword())
                        .email(user.getEmail())
                        .build()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("User delete successfully");
    }



}
