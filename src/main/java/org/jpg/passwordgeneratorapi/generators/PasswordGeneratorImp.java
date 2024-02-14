package org.jpg.passwordgeneratorapi.generators;

import lombok.SneakyThrows;
import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.springframework.stereotype.Component;
import java.util.Random;
import java.util.stream.*;


@Component
public class PasswordGeneratorImp implements PasswordGenerator {


    @Override
    public String generate(String available, Integer size) throws IllegalStateOfAvailableSymbols {
        if(available == null || available.isBlank() || size < 1)
            throw new IllegalStateOfAvailableSymbols("At least one variable must be true and size should be  greater than 0");
        Random random = new Random();
        int stringSize = available.length();
        return IntStream.range(0, size)
                .parallel()
                .map(i -> random.nextInt(0, stringSize))
                .mapToObj(i -> available.charAt(i) + "")
                .collect(Collectors.joining());
    }

    @SneakyThrows
    @Override
    public String getReliability(AvailableSymbols pass) {
        if(pass.getSize() < 6) return "very weak";
        int res = (pass.getUppercase() ? 1 : 0) +
                (pass.getLowercase() ? 1 : 0) +
                (pass.getSymbols() ? 1 : 0) +
                (pass.getNumbers() ? 1 : 0);

        return switch (res) {
            case 1 -> "weak";
            case 2 -> "good";
            case 3 -> "strong";
            case 4 -> "very strong";
            default -> "error";
        };
    }
}
