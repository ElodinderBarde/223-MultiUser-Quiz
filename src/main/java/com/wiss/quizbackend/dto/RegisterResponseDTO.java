package com.wiss.quizbackend.dto;


import com.wiss.quizbackend.entity.RoleEnum;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class RegisterResponseDTO {

    private Long id;
    private String username;
    private String email;
    private String password;
    private RoleEnum role;

}