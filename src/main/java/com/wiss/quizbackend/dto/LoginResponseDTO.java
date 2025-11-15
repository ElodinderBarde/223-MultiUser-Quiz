package com.wiss.quizbackend.dto;

import lombok.Getter;
import lombok.ToString;


@Getter
@ToString(exclude = "token")
public class LoginResponseDTO {

    private final String token;
    private final String tokenType = "Bearer";
    private final Long userId;
    private final String username;
    private final String email;
    private final String role;
    private final long expiresIn;

    public LoginResponseDTO(String token,
                            Long userId,
                            String username,
                            String email,
                            String role,
                            long expiresIn) {
        this.token = token;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.expiresIn = expiresIn;
    }
}
