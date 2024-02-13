
package org.jpg.passwordgeneratorapi.controllers;
import jakarta.validation.Valid;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.*;
import org.jpg.passwordgeneratorapi.security.jwt.JwtResponse;
import org.jpg.passwordgeneratorapi.services.UserService;
import org.jpg.passwordgeneratorapi.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody User user) throws UserNotFoundException, IncorrectPasswordException, UserRegisteredWithGoogleException {
        userService.login(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt, user.getEmail()));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid  @RequestBody User user) throws UserIsAlreadyRegistered, IncorrectPasswordException, UserRegisteredWithGoogleException, UserNotFoundException {
        userService.registerUser(User.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .build());
        return authenticateUser(user);
    }


}
