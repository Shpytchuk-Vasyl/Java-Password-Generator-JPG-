package org.jpg.passwordgeneratorapi.controllers;


import org.jpg.passwordgeneratorapi.entity.Password;
import org.jpg.passwordgeneratorapi.entity.User;
import org.jpg.passwordgeneratorapi.services.PasswordService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.*;
import static org.hamcrest.Matchers.*;

import java.util.ArrayList;
import java.util.List;


//@WebMvcTest(PasswordController.class)
@SpringBootTest
@AutoConfigureMockMvc
class PasswordControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PasswordService service;


    @Test
    void contextLoads() {
       assertThat(mvc).isNotNull();
       assertThat(service).isNotNull();
    }

    @Test
    void getPasswordValidRequest() throws Exception {
        mvc.perform(get("/api/v1/passwords/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"uppercase\": true,\n" +
                                "    \"lowercase\": true,\n" +
                                "    \"numbers\": true,\n" +
                                "    \"symbols\": true,\n" +
                                "    \"size\" : 1\n" +
                                "}")
                )
                .andExpect(status().isOk());


        mvc.perform(get("/api/v1/passwords/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"uppercase\": true,\n" +
                                "    \"lowercase\": true,\n" +
                                "    \"numbers\": true,\n" +
                                "    \"symbols\": true,\n" +
                                "    \"size\" : 100\n" +
                                "}")
                )
                .andExpect(status().isOk());

    }


    @Test
    void getPasswordInvalidRequest() throws Exception {
        mvc.perform(get("/api/v1/passwords/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"uppercase\": true,\n" +
                                "    \"lowercase\": true,\n" +
                                "    \"numbers\": true,\n" +
                                "    \"symbols\": true,\n" +
                                "    \"size\" : 0\n" +
                                "}")
                )
                .andExpect(status().isBadRequest());

        mvc.perform(get("/api/v1/passwords/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"uppercase\": false,\n" +
                                "    \"lowercase\": false,\n" +
                                "    \"numbers\": false,\n" +
                                "    \"symbols\": false,\n" +
                                "    \"size\" : 10\n" +
                                "}")
                )
                .andExpect(status().isBadRequest());


    }

    @Test
    void getPasswords() throws Exception {
        Mockito.when(service.getAllPasswordsByUserId(Long.valueOf(1))).thenReturn(new ArrayList<>());

        mvc.perform(get("/api/v1/passwords/1"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("[]")));


        User user = new User((long) 2, "pass", "email@gmail.com");
        Password password = new Password((long)1, "name", "pass", user);
        Mockito.when(service.getAllPasswordsByUserId(Long.valueOf(2)))
                .thenReturn(List.of(password, new Password()));

        mvc.perform(get("/api/v1/passwords/2"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name", is(password.getName())))
                .andExpect(jsonPath("$[0].password", is(password.getPassword())))
                .andExpect(jsonPath("$[1].password", nullValue()));

    }

    @Test
    void savePasswordValidRequest() throws Exception {
        User user = new User((long) 2, "pass", "email@gmail.com");
        Password password = Password.builder().name("name").password("pass").owner(user).build();
        Mockito.when(service.addNewPassword(password))
                .thenReturn(password);
        password.setId((long)1);

        mvc.perform(post("/api/v1/passwords/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"name\": \"name\",\n" +
                                "    \"password\": \"pass\",\n" +
                                "    \"owner\": [{\n" +
                                "        \"password\":\"pass\",\n" +
                                "        \"email\": \"email@gmail.com\",\n" +
                                "        \"id\": 2\n" +
                                "    }]\n" +
                                "}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name", is(password.getName())))
                .andExpect(jsonPath("$.password", is(password.getPassword())))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.owner.id", is(password.getOwner().getId())));
    }

    @Test
    void editPassword() {
    }

    @Test
    void deletePassword() {
    }


}