package org.jpg.passwordgeneratorapi.controllers;

import jakarta.validation.Valid;
import org.jpg.passwordgeneratorapi.entity.Password;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.generators.AvailableSymbols;
import org.jpg.passwordgeneratorapi.generators.PasswordGenerator;
import org.jpg.passwordgeneratorapi.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/v1/passwords")
public class PasswordController {

    @Autowired
    PasswordService service;

    @Autowired
    PasswordGenerator generator;

    @GetMapping("/")
    public ResponseEntity<String> getPassword(@Valid @RequestBody AvailableSymbols availableSymbols) throws IllegalStateOfAvailableSymbols {
        return ResponseEntity.ok(generator.generate(availableSymbols.getString(), availableSymbols.getSize()));
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Password>> getPasswords(@PathVariable String email)  {
        return ResponseEntity.ok(service.getAllPasswordsByEmail(email));
    }

    @PostMapping("/")
    public ResponseEntity<Password> savePassword(@Valid @RequestBody Password password) throws UserNotFoundException {
        return ResponseEntity.ok(service.addNewPassword(Password.builder()
                        .password(password.getPassword())
                        .name(password.getName())
                        .owner(password.getOwner())
                .build())
        );
    }

    @PutMapping("/")
    public ResponseEntity<Password> editPassword(@Valid @RequestBody Password password) throws UserNotFoundException {
        return ResponseEntity.ok(service.editPassword(password));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePassword(@RequestBody Password password) {
        service.deletePasswordById(password.getId());
        return ResponseEntity.ok("Password delete successfully");
    }

}
