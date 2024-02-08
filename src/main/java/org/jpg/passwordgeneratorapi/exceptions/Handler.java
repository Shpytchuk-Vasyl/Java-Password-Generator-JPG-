package org.jpg.passwordgeneratorapi.exceptions;

import org.jpg.passwordgeneratorapi.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class Handler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<User> userNotFoundException(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<> (new User(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserIsAlreadyRegistered.class)
    public ResponseEntity<User> userIsAlreadyRegistered(UserIsAlreadyRegistered ex, WebRequest request) {
        return new ResponseEntity<> (new User(), HttpStatus.NOT_FOUND);
    }

}
