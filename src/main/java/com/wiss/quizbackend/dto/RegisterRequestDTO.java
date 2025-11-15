package com.wiss.quizbackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.apache.logging.log4j.message.Message;

import java.util.Map;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterRequestDTO {
    @NotBlank(message= "Username cannot be blank")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank(message= "Email cannot be blank")
    @Email(message = "Email must be valid")
    @Size(min = 5, max = 50, message = "Email must be between 5 and 50 characters")
    private String email;


   @NotBlank(message = "Password cannot be blank")
   @Size(min = 6, max = 100, message = "Password must be at least 6 characters long")
   private String password;




}
