package org.jpg.passwordgeneratorapi.generators;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Data
public class AvailableSymbols {

    @Positive(message = "Size should be greater than 0")
    private Integer size;
    private Boolean uppercase, lowercase, numbers, symbols;

    public AvailableSymbols() {
        this.size = 1;
        this.uppercase = true;
        this.lowercase = true;
        this.numbers = true;
        this.symbols = true;
    }

    @Valid
    public AvailableSymbols(Integer size, Boolean uppercase, Boolean lowercase, Boolean numbers, Boolean symbols) {
        this.size = size;
        this.uppercase = uppercase;
        this.lowercase = lowercase;
        this.numbers = numbers;
        this.symbols = symbols;
    }

    public String getString() throws IllegalStateOfAvailableSymbols {
        if((uppercase || lowercase || numbers ||symbols) == false)
            throw new IllegalStateOfAvailableSymbols("At least one variable must be true");
        return (uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
                (lowercase ? "abcdefghijklmnopqrstuvwxy" : "") +
                (numbers ? "0123456789" : "") +
                (symbols ? "?!;:.,_<>[]{}\\|/#@$%&`~^'₴*-+=" : "");
    }

    public String[] getStrings() {
        return new String[]{(uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : ""),
                (lowercase ? "abcdefghijklmnopqrstuvwxy" : ""),
                (numbers ? "0123456789" : ""),
                (symbols ? "?!;:.,_<>[]{}\\|/#@$%&`~^'₴*-+=" : "")};
    }
}
