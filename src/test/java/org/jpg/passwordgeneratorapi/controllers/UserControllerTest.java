package org.jpg.passwordgeneratorapi.controllers;

import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.exceptions.UserIsAlreadyRegistered;
import org.jpg.passwordgeneratorapi.exceptions.UserNotFoundException;
import org.jpg.passwordgeneratorapi.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService service;


    @Test
    void contextLoads() {
        assertThat(mvc).isNotNull();
        assertThat(service).isNotNull();
    }

    @Test
    void getUser() throws Exception {
        User user = new User((long) 1, "pass", "email@gmail.com");
        Mockito.when(service.findUser((long)1)).thenReturn(user);

        mvc.perform(get("/api/v1/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", is(user.getEmail())))
                .andExpect(jsonPath("$.password", is(user.getPassword())))
                .andExpect(jsonPath("$.id", is(1)));

        Mockito.when(service.findUser((long)2)).thenThrow(new UserNotFoundException("Not found"));

        mvc.perform(get("/api/v1/users/2"))
                .andExpect(status().isNotFound());
    }

    @Test
    void registerUser() throws Exception {
        User user = new User(1L, "pass", "email@gmail.com");
        Mockito.when(service.registerUser(user)).thenReturn(user);

        mvc.perform(post("/api/v1/users/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                        "   \"email\":\"email@gmail.com\",\n" +
                        "   \"password\":\"pass\"\n" +
                        "}"))
                .andExpect(status().isOk());

        user.setId(2L);
        Mockito.when(service.registerUser(user)).thenThrow(new UserIsAlreadyRegistered(user));

        mvc.perform(get("/api/v1/users/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "   \"email\":\"email@gmail.com\",\n" +
                                "   \"password\":\"pass\"\n" +
                                "}"))
                .andExpect(status().isMethodNotAllowed());
    }

}