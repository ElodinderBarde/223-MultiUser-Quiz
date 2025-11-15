package com.wiss.quizbackend.config;




/**
 * Security-Konfiguration für die Applikation.
 *
 * Diese Klasse definiert:
 * - Wie Passwörter gehashed werden (BCrypt)
 * - Welche URLs geschützt sind
 * - CORS und CSRF Einstellungen
 */



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {



    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return new AuthenticationConfiguration().getAuthenticationManager();
    }





    /**
     * PasswordEncoder Bean für BCrypt Hashing.
     *
     * Work Factor 12 bedeutet:
     * - 2^12 = 4096 Hash-Iterationen
     * - Ca. 250ms pro Passwort auf modernen CPUs
     * - Guter Kompromiss zwischen Sicherheit und Performance
     *
     * @return BCryptPasswordEncoder mit Stärke 12
     */
@Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    /**
     * Security Filter Chain Configuration.
     *
     * TEMPORÄR: Alle Requests erlauben für Entwicklung
     * SPÄTER: JWT Authentication hinzufügen
     */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configure(http))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/**",      // Login & Register - jeder darf rein
                                "/swagger-ui/**",    // API Dokumentation - öffentlich
                                "/v3/api-docs/**"    // OpenAPI Docs - öffentlich
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );;

        return http.build();
    }
}



