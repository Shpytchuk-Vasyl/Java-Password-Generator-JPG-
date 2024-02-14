package org.jpg.passwordgeneratorapi.security.jwt;

import jakarta.validation.Valid;
import lombok.Data;
import org.jpg.passwordgeneratorapi.entity.User;

@Data
public class JwtResponse {

    private String jwtToken;
    private User user;

    public JwtResponse(String jwt, User user) {
        this.jwtToken = jwt;
        this.user = user;
    }
}
