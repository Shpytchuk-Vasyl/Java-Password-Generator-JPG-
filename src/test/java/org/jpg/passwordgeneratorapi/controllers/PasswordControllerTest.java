package org.jpg.passwordgeneratorapi.controllers;


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

import java.util.ArrayList;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@WebMvcTest(PasswordController.class)
@SpringBootTest
@AutoConfigureMockMvc
class PasswordControllerTest {


    @Autowired
    private MockMvc mvc;

    @MockBean
    private PasswordService service;

    @Test
    void getValidPassword() throws Exception {
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
    void getInvalidRequestPassword() throws Exception {
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
    void getPasswords() {
        Mockito.when(service.getAllPasswordsByUserId(Long.valueOf(1))).thenReturn(new ArrayList<>());
    }

    @Test
    void savePassword() {
    }

    @Test
    void editPassword() {
    }

    @Test
    void deletePassword() {
    }


}