package org.jpg.passwordgeneratorapi.exceptions;

public class UserNotFoundException extends Exception {
    public UserNotFoundException() {
        super("User not found");
    }

}
