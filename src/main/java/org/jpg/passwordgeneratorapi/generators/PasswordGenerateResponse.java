package org.jpg.passwordgeneratorapi.generators;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordGenerateResponse {
    private String password;
    private String reliability;
}
