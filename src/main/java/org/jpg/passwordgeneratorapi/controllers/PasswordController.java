package org.jpg.passwordgeneratorapi.controllers;

import jakarta.validation.Valid;
import org.jpg.passwordgeneratorapi.entity.Password;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.jpg.passwordgeneratorapi.exceptions.IncorrectPasswordException;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.generators.AvailableSymbols;
import org.jpg.passwordgeneratorapi.generators.PasswordGenerateResponse;
import org.jpg.passwordgeneratorapi.generators.PasswordGenerator;
import org.jpg.passwordgeneratorapi.security.jwt.JwtUtil;
import org.jpg.passwordgeneratorapi.services.PasswordService;
import org.jpg.passwordgeneratorapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.headers.HeadersSecurityMarker;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/v1/passwords")
public class PasswordController {

    @Autowired
    PasswordService service;

    @Autowired
    UserService userService;

    @Autowired
    PasswordGenerator generator;

    @GetMapping("/generate/")
    public ResponseEntity<PasswordGenerateResponse> generatePassword(
            @RequestParam(value = "uppercase", defaultValue = "true") boolean uppercase,
            @RequestParam(value = "lowercase", defaultValue = "true") boolean lowercase,
            @RequestParam(value = "numbers", defaultValue = "true") boolean numbers,
            @RequestParam(value = "symbols", defaultValue = "true") boolean symbols,
            @RequestParam(value = "size", defaultValue = "8") int size
    ) throws IllegalStateOfAvailableSymbols {
        AvailableSymbols availableSymbols = new AvailableSymbols(size,  uppercase, lowercase, numbers, symbols);
        String pass = generator.generate(availableSymbols.getString(), availableSymbols.getSize());
        return ResponseEntity.ok(new PasswordGenerateResponse(pass, generator.getReliability(availableSymbols)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Password>> getUsersPassword(@PathVariable Long id) throws UserNotFoundException {
        if (Objects.equals(id, userService.findUser(
                SecurityContextHolder.getContext().getAuthentication().getName()).getId()))
            return ResponseEntity.ok(service.getAllPasswordsByUserId(id));
        return ResponseEntity.badRequest().body(new ArrayList<>());
    }

    @PostMapping("/")
    public ResponseEntity<String> savePassword(@Valid @RequestBody Password password) throws UserNotFoundException {
        service.addNewPassword(Password.builder()
                        .password(password.getPassword())
                        .name(password.getName())
                        .owner(userService.findUser(password.getOwner().getEmail()))
                        .build());
        return ResponseEntity.ok("Password saved successfully");
    }

    @PutMapping("/")
    public ResponseEntity<String> editPassword(@Valid @RequestBody Password password) throws UserNotFoundException, IncorrectPasswordException {
        password.setOwner(userService.findUser(password.getOwner().getEmail()));
        service.editPassword(password);
        return ResponseEntity.ok("Password saved successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePassword(@RequestBody Password password) {
        service.deletePasswordById(password.getId());
        return ResponseEntity.ok("Password delete successfully");
    }

}
