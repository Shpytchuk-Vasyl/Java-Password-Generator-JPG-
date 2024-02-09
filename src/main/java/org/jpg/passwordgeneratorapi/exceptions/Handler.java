package org.jpg.passwordgeneratorapi.exceptions;

import org.jpg.passwordgeneratorapi.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class Handler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<User> userNotFoundException(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<> (new User(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserIsAlreadyRegistered.class)
    public ResponseEntity<User> userIsAlreadyRegistered(UserIsAlreadyRegistered ex, WebRequest request) {
        return new ResponseEntity<> (ex.getUser(), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, IllegalStateOfAvailableSymbols.class})
    public ResponseEntity<String> userIsAlreadyRegistered(Exception ex, WebRequest request) {
        return new ResponseEntity<> (ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
