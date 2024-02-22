package org.jpg.passwordgeneratorapi.services;

import org.jpg.passwordgeneratorapi.entity.GoogleUser;
import org.jpg.passwordgeneratorapi.exceptions.IncorrectPasswordException;
import org.jpg.passwordgeneratorapi.exceptions.UserIsAlreadyRegistered;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.UserRegisteredWithGoogleException;
import org.jpg.passwordgeneratorapi.repository.GoogleDetailRepository;
import org.jpg.passwordgeneratorapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.util.Optional;

@Service
public class UserService extends OidcUserService {
    @Autowired
    UserRepository useRepository;
    @Autowired
    GoogleDetailRepository googleDetailRepository;



    public User registerUser(User user) throws UserIsAlreadyRegistered {
        Optional<User> user1 = useRepository.findByEmail(user.getEmail());
        if(user1.isPresent()) throw new UserIsAlreadyRegistered("User with this email is already registered");
        return useRepository.save(user);
    }

    public User findUser(String email) throws UserNotFoundException {
        return useRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }

    public User findUser(Long id) throws UserNotFoundException {
        return useRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }


    public void delete(Long id) {
        useRepository.deleteById(id);
    }

    public User login(User user) throws UserNotFoundException, UserRegisteredWithGoogleException, IncorrectPasswordException {
        User find = findUser(user.getEmail());
        if(find.getPassword().isEmpty()) {
            throw new UserRegisteredWithGoogleException();
        } else if(find.getPassword().equals(user.getPassword())){
            return find;
        } else {
            throw new IncorrectPasswordException();
        }
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oAuth2User = super.loadUser(userRequest);
        return processOAuth2User(oAuth2User);
    }


    private OidcUser processOAuth2User(OidcUser oAuth2User) {
        GoogleUser userInfoDto = GoogleUser
                .builder()
                .id(oAuth2User.getAttributes().get("sub").toString())
                .userId(new User(oAuth2User.getAttributes().get("email").toString()))
                .build();

        System.out.println(userInfoDto);
        Optional<User> userOptional = useRepository.findByEmail(userInfoDto.getUserId().getEmail());
        /*User user = userOptional.orElseGet(() -> registerNewUser(userInfoDto));
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);*/
        return oAuth2User;
    }

    private User registerNewUser(GoogleUser userInfoDto) {
        System.out.println("save user ");
        googleDetailRepository.save(userInfoDto);
        return userInfoDto.getUserId();
    }



}
