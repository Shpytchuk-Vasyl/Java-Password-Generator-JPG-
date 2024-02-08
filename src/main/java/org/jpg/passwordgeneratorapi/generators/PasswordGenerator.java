package org.jpg.passwordgeneratorapi.generators;

import jakarta.validation.constraints.Positive;

public interface PasswordGenerator {
    String generate(String available, @Positive  Integer size);

}
