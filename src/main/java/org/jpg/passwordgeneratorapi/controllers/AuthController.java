
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.web.bind.annotation.*;



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
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody User user) throws UserNotFoundException, IncorrectPasswordException, UserRegisteredWithGoogleException {
        User login = userService.login(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        login.setPassword("");
        return ResponseEntity.ok(new JwtResponse(jwt, login));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid  @RequestBody User user) throws UserIsAlreadyRegistered, IncorrectPasswordException, UserRegisteredWithGoogleException, UserNotFoundException {
        if(user.getPassword().isBlank()) throw new IncorrectPasswordException("Password can't be empty");
        userService.registerUser(User.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .build());
        return authenticateUser(user);
    }


}

@RestController
class GoogleAuth {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;


    @GetMapping("/login/oauth2/code/google/")
    public ResponseEntity<?> signInWithGoogle() throws UserNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null) {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            ((OAuth2AuthenticatedPrincipal)authentication.getPrincipal())
                                    .getAttribute("email").toString(), ""));
            String jwt = jwtUtil.generateJwtToken(authentication);
            return ResponseEntity.ok(new JwtResponse(jwt, userService.findUser(authentication.getName())));
        }
        return ResponseEntity.badRequest().build();
    }

}