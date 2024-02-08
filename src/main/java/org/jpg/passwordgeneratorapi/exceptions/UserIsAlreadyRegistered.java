package org.jpg.passwordgeneratorapi.exceptions;

import lombok.Getter;
import org.jpg.passwordgeneratorapi.entity.User;

@Getter
public class UserIsAlreadyRegistered extends Exception {
    private final User user;
    public UserIsAlreadyRegistered(User user) {
        super();
        this.user = user;
    }


}
