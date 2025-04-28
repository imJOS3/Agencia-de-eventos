package com.agencia.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Desactivar CSRF de forma moderna
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll() // TODAS las rutas permitidas
                )
                .formLogin(AbstractHttpConfigurer::disable) // Deshabilitar formulario de login
                .httpBasic(AbstractHttpConfigurer::disable); // Deshabilitar autenticación básica

        return http.build();
    }
}
