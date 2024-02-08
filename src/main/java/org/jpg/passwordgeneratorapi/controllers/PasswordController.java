package org.jpg.passwordgeneratorapi.controllers;

import org.jpg.passwordgeneratorapi.entity.Password;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.jpg.passwordgeneratorapi.exceptions.UserIsAlreadyRegistered;
import org.jpg.passwordgeneratorapi.generators.AvailableSymbols;
import org.jpg.passwordgeneratorapi.generators.PasswordGenerator;
import org.jpg.passwordgeneratorapi.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/passwords")
public class PasswordController {

    @Autowired
    PasswordService service;
    @Autowired
    PasswordGenerator generator;

    @GetMapping("/")
    public ResponseEntity<String> getPassword(@RequestBody AvailableSymbols availableSymbols) throws IllegalStateOfAvailableSymbols {
        return ResponseEntity.ok(generator.generate(availableSymbols.getString(), availableSymbols.getSize()));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Password>> getPasswords(@PathVariable Long userId)  {
        return ResponseEntity.ok(service.getAllPasswordsByUserId(userId));
    }

    @PostMapping("/")
    public ResponseEntity<Password> savePassword(@RequestBody Password password, @RequestBody User user) {
        return ResponseEntity.ok(service.addNewPassword(Password.builder()
                        .password(password.getPassword())
                        .name(password.getName())
                        .owner(user)
                .build())
        );
    }

    @PutMapping("/")
    public ResponseEntity<Password> editPassword(@RequestBody Password password) {
        return ResponseEntity.ok(service.editPassword(password));
    }


}