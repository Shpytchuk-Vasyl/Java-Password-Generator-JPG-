package org.jpg.passwordgeneratorapi.generators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailableSymbols {

    private Integer size;
    private Boolean uppercase, lowercase, numbers, symbols;

    public String getString() throws IllegalStateOfAvailableSymbols {
        if((uppercase || lowercase || numbers ||symbols) == false)
            throw new IllegalStateOfAvailableSymbols();
        for (char i = 'A'; i < 'z'; i++) {
            System.out.print(i);
        }
        return (uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
                (lowercase ? "abcdefghijklmnopqrstuvwxy" : "") +
                (numbers ? "0123456789" : "") +
                (symbols ? "?!;:.,_<>[]{}\\|/#@$%&`~^'₴*-+=" : "");
    }
}
