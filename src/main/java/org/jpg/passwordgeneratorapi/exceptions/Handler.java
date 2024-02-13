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
    public ResponseEntity<String> userNotFoundException(UserNotFoundException ex, WebRequest request) {
        return new ResponseEntity<> (ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class,
            IllegalStateOfAvailableSymbols.class,
            IncorrectPasswordException.class,
            UserRegisteredWithGoogleException.class,
            UserIsAlreadyRegistered.class})
    public ResponseEntity<String> methodArgumentNotValidException(Exception ex, WebRequest request) {
        return new ResponseEntity<> (ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
