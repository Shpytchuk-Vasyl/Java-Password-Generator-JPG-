package org.jpg.passwordgeneratorapi.generators;

import jakarta.validation.constraints.Positive;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;

public interface PasswordGenerator {
    String generate(String available, @Positive  Integer size) throws IllegalStateOfAvailableSymbols;
    String getReliability(String pass);
}
