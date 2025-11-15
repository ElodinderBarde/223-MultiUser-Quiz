package com.wiss.quizbackend.controller;

import com.wiss.quizbackend.dto.LoginRequestDTO;
import com.wiss.quizbackend.dto.LoginResponseDTO;
import com.wiss.quizbackend.dto.RegisterRequestDTO;
import com.wiss.quizbackend.dto.RegisterResponseDTO;
import com.wiss.quizbackend.entity.AppUser;
import com.wiss.quizbackend.entity.RoleEnum;
import com.wiss.quizbackend.service.AppUserService;
import com.wiss.quizbackend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AppUserService appUserService;
    private final JwtService jwtService;

    // ===========================================================
    // POST /api/auth/login
    // ===========================================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        try {
            // 1. User anhand von usernameOrEmail finden
            Optional<AppUser> userOpt;
            if (request.getUsernameOrEmail().contains("@")) {
                userOpt = appUserService.findByEmail(request.getUsernameOrEmail());
            } else {
                userOpt = appUserService.findByUsername(request.getUsernameOrEmail());
            }

            if (userOpt.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Ungültige Anmeldedaten"));
            }

            AppUser user = userOpt.get();

            // 2. Passwort prüfen über Service
            Optional<AppUser> authenticatedUser =
                    appUserService.authenticate(user.getUsername(), request.getPassword());

            if (authenticatedUser.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Ungültige Anmeldedaten"));
            }

            // 3. JWT Token generieren
            String token = jwtService.generateToken(
                    user.getUsername(),
                    user.getRole().name()
            );

            // 4. LoginResponseDTO bauen
            LoginResponseDTO response = new LoginResponseDTO(
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().name(),
                    86400000L // 24h in Millisekunden
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error",
                            "Ein Fehler ist aufgetreten: " + e.getMessage()));
        }
    }

    // ===========================================================
    // POST /api/auth/register
    // ===========================================================
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO request) {

        try {
            AppUser savedUser = appUserService.registerUser(
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword(),
                    RoleEnum.USER
            );

            RegisterResponseDTO response = RegisterResponseDTO.builder()
                    .id(savedUser.getId())
                    .username(savedUser.getUsername())
                    .email(savedUser.getEmail())
                    .role(RoleEnum.valueOf(savedUser.getRole().name()))
                    .email("Registrierung erfolgreich! Willkommen " + savedUser.getUsername() + "!")
                    .build();

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Internal server error: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // ===========================================================
    // GET /api/auth/check-username/{username}
    // ===========================================================
    @GetMapping("/check-username/{username}")
    public ResponseEntity<Map<String, Object>> checkUsername(@PathVariable String username) {

        boolean available = appUserService.isUsernameAvailable(username);

        Map<String, Object> response = new HashMap<>();
        response.put("available", available);
        response.put("message", available ? "Username ist verfügbar" : "Username bereits vergeben");

        return ResponseEntity.ok(response);
    }

    // ===========================================================
    // GET /api/auth/check-email/{email}
    // ===========================================================
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable String email) {

        boolean available = appUserService.isEmailAvailable(email);

        Map<String, Object> response = new HashMap<>();
        response.put("available", available);
        response.put("message", available ? "Email ist verfügbar" : "Email bereits registriert");

        return ResponseEntity.ok(response);
    }

    // ===========================================================
    // GET /api/auth/test
    // ===========================================================
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {

        Map<String, String> response = new HashMap<>();
        response.put("status", "AuthController erreichbar");

        return ResponseEntity.ok(response);
    }
}
