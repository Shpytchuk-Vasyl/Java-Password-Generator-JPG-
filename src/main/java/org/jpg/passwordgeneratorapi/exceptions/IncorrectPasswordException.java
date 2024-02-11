package org.jpg.passwordgeneratorapi.exceptions;

public class IncorrectPasswordException extends Throwable {
    public IncorrectPasswordException() {
        super("You entered an incorrect password");
    }
}
