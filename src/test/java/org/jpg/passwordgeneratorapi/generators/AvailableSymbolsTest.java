package org.jpg.passwordgeneratorapi.generators;

import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
class AvailableSymbolsTest {
    private AvailableSymbols available = new AvailableSymbols(10,true,false,false,false);

    @Test
    void validData() throws IllegalStateOfAvailableSymbols {

        String str = available.getString();
        assertFalse(str.contains("a"));
        assertFalse(str.contains("1"));
        assertFalse(str.contains("."));

        available.setLowercase(true);
        String str1 = available.getString();
        assertFalse(str1.contains("1"));
        assertFalse(str1.contains("."));

        available.setNumbers(true);
        String str2 = available.getString();
        assertFalse(str2.contains("."));

        available.setSymbols(true);
        String str3 = available.getString();
        assertTrue(str3.contains("A"));
        assertTrue(str3.contains("a"));
        assertTrue(str3.contains("1"));
        assertTrue(str3.contains("."));
    }

    @Test
    void illegalStateOfAvailableSymbols() throws IllegalStateOfAvailableSymbols {
        available = new AvailableSymbols(10,false,false,false,false);
        assertThrows(IllegalStateOfAvailableSymbols.class, available::getString);

    }

}