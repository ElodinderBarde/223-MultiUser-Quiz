package com.wiss.quizbackend.dto;
import lombok.*;

import jakarta.validation.constraints.NotBlank;


@Getter
@Setter
@ToString(exclude = "password")
@NoArgsConstructor
public class LoginRequestDTO {


    @NotBlank(message= "Username or Email needed and cannot be blank")
    private String usernameOrEmail;

    @NotBlank(message = "Password cannot be blank")
    private String password;




}
