package org.jpg.passwordgeneratorapi.controllers;

import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.UserIsAlreadyRegistered;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/")
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) throws UserNotFoundException {
        return ResponseEntity.ok(service.findUser(id));
    }

    @PostMapping("/user")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws UserNotFoundException, UserIsAlreadyRegistered {
        return ResponseEntity.ok(service.registerUser(user));
    }


}
