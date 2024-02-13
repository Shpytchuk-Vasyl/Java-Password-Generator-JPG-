package org.jpg.passwordgeneratorapi.security.jwt;

import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Data;

@Data
public class JwtResponse {

    private String jwt;
    private String email;
    private String type = "Bearer";

    public JwtResponse(String jwt, String email) {
        this.jwt = jwt;
        this.email = email;
    }
}
