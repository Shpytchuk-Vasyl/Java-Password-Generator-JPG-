package org.jpg.passwordgeneratorapi.config;

import org.jpg.passwordgeneratorapi.security.jwt.AuthEntryPointJwt;
import org.jpg.passwordgeneratorapi.security.AuthTokenFilter;
import org.jpg.passwordgeneratorapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.ForwardAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableWebSecurity(debug = true)
public class WebSecurityConfig {
    private UserService userService;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfiguration()).and()
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests().requestMatchers(
                        "/api/v1/auth/**",
                        "/api/v1/passwords/generate/**",
                        "/hello/**").permitAll()

                .anyRequest().authenticated().and()
                .oauth2Login()
                .successHandler( this.authenticationSuccessHandler())
                .userInfoEndpoint()
                .oidcUserService(userService);

        http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    private AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new ForwardAuthenticationSuccessHandler("/login/oauth2/code/google/");
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfiguration() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration);
        return urlBasedCorsConfigurationSource;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public AuthTokenFilter authTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public AuthEntryPointJwt authEntryPointJwt() {
        return new AuthEntryPointJwt();
    }


    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authenticationProvider);
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                return rawPassword.toString();
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return encodedPassword.equals(rawPassword.toString());
            }
        };
    }


}
