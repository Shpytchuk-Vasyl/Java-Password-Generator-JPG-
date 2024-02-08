package org.jpg.passwordgeneratorapi.controllers;

import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.UserIsAlreadyRegistered;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) throws UserNotFoundException {
        return ResponseEntity.ok(service.findUser(id));
    }

    @PostMapping("")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws UserIsAlreadyRegistered {
        return ResponseEntity.ok(service.registerUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) throws UserNotFoundException {
        service.delete(id);
        return ResponseEntity.ok("User delete successfully");
    }



}
