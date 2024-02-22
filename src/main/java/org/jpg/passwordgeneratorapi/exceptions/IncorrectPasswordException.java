package org.jpg.passwordgeneratorapi.exceptions;

public class IncorrectPasswordException extends Exception {
    public IncorrectPasswordException() {
        super("You entered an incorrect password");
    }

    public IncorrectPasswordException(String message) {
        super(message);
    }
}
