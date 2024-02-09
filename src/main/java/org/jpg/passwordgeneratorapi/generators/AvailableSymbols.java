package org.jpg.passwordgeneratorapi.generators;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailableSymbols {

    @Positive
    private Integer size;
    private Boolean uppercase, lowercase, numbers, symbols;

    public String getString() throws IllegalStateOfAvailableSymbols {
        if((uppercase || lowercase || numbers ||symbols) == false)
            throw new IllegalStateOfAvailableSymbols();
        return (uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
                (lowercase ? "abcdefghijklmnopqrstuvwxy" : "") +
                (numbers ? "0123456789" : "") +
                (symbols ? "?!;:.,_<>[]{}\\|/#@$%&`~^'₴*-+=" : "");
    }
}
