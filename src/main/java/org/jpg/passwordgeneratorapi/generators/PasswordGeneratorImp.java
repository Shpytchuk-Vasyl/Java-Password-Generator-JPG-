package org.jpg.passwordgeneratorapi.generators;

import org.jpg.passwordgeneratorapi.exceptions.IllegalStateOfAvailableSymbols;
import org.springframework.stereotype.Component;
import java.util.Random;
import java.util.stream.*;


@Component
public class PasswordGeneratorImp implements PasswordGenerator {
    @Override
    public String generate(String available, Integer size) throws IllegalStateOfAvailableSymbols {
        if(available == null || available.isBlank() || size < 1)
            throw new IllegalStateOfAvailableSymbols();
        Random random = new Random();
        int stringSize = available.length();
        return IntStream.range(0, size)
                .parallel()
                .map(i -> random.nextInt(0, stringSize))
                .mapToObj(i -> available.charAt(i) + "")
                .collect(Collectors.joining());
    }
}
