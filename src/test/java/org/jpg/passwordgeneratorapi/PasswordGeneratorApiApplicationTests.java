package org.jpg.passwordgeneratorapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


class PasswordGeneratorApiApplicationTests {

    @Test
    void contextLoads() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPassword = "mySecretPassword";

        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Encoded Password: " + encodedPassword);

        String decodedPassword = passwordEncoder.encode(encodedPassword);
        System.out.println("Decoded Password: " + decodedPassword);

        System.out.println(passwordEncoder.matches(encodedPassword,decodedPassword));

    }

}
