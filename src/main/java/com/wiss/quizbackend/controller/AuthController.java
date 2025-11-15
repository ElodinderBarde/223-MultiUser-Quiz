package com.wiss.quizbackend.controller;

import com.wiss.quizbackend.dto.RegisterRequestDTO;
import com.wiss.quizbackend.dto.RegisterResponseDTO;
import com.wiss.quizbackend.entity.AppUser;
import com.wiss.quizbackend.entity.RoleEnum;
import com.wiss.quizbackend.service.AppUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AppUserService appUserService;

    //===========================================================
    // POST /api/auth/register
    //===========================================================
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


    //===========================================================
    // GET /api/auth/check-username/{username}
    //===========================================================
    @GetMapping("/check-username/{username}")
    public ResponseEntity<Map<String, Object>> checkUsername(@PathVariable String username) {

        boolean available = appUserService.isUsernameAvailable(username);

        Map<String, Object> response = new HashMap<>();
        response.put("available", available);
        response.put("message", available ? "Username ist verfügbar" : "Username bereits vergeben");

        return ResponseEntity.ok(response);
    }


    //===========================================================
    // GET /api/auth/check-email/{email}
    //===========================================================
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable String email) {

        boolean available = appUserService.isEmailAvailable(email);

        Map<String, Object> response = new HashMap<>();
        response.put("available", available);
        response.put("message", available ? "Email ist verfügbar" : "Email bereits registriert");

        return ResponseEntity.ok(response);
    }


    //===========================================================
    // GET /api/auth/test
    //===========================================================
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {

        Map<String, String> response = new HashMap<>();
        response.put("status", "AuthController erreichbar");

        return ResponseEntity.ok(response);
    }
}
