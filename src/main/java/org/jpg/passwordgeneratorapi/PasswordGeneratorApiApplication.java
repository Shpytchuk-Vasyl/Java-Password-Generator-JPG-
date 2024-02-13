package org.jpg.passwordgeneratorapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;

@SpringBootApplication()
@EnableMethodSecurity(securedEnabled = true)
@EnableWebSecurity()
public class PasswordGeneratorApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PasswordGeneratorApiApplication.class, args);
    }

}
