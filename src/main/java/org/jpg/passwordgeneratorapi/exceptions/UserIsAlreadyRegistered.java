package org.jpg.passwordgeneratorapi.exceptions;

import lombok.Getter;
import org.jpg.passwordgeneratorapi.entity.User;

@Getter
public class UserIsAlreadyRegistered extends Exception {
    public UserIsAlreadyRegistered(String str) {
        super(str);
    }


}
