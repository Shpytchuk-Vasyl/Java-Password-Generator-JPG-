package org.jpg.passwordgeneratorapi.generators;

import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PasswordGeneratorImpTest {
    private PasswordGenerator generator = new PasswordGeneratorImp();
    private AvailableSymbols symbols = new AvailableSymbols(10, true, true, true, true);

    @Test
    void ValidString() {

        assertDoesNotThrow(() -> generator.generate(symbols.getString(), symbols.getSize()));

        symbols.setUppercase(false);
        assertDoesNotThrow(() -> generator.generate(symbols.getString(), symbols.getSize()));

        symbols.setLowercase(false);
        assertDoesNotThrow(() -> generator.generate(symbols.getString(), symbols.getSize()));

        symbols.setNumbers(false);
        assertDoesNotThrow(() -> generator.generate(symbols.getString(), symbols.getSize()));

    }

    @Test
    void InvalidData() {
        assertThrows(IllegalStateOfAvailableSymbols.class, () -> generator.generate("", 10));
        assertThrows(IllegalStateOfAvailableSymbols.class, () -> generator.generate(null, 10));
        assertThrows(IllegalStateOfAvailableSymbols.class, () -> generator.generate(symbols.getString(), -10));
        assertThrows(IllegalStateOfAvailableSymbols.class, () -> generator.generate(symbols.getString(), 0));

    }
}