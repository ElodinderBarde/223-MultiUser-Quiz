package com.wiss.quizbackend.controller;

import com.wiss.quizbackend.entity.AppUser;
import com.wiss.quizbackend.repository.AppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class AppUserController {


    private final AppUserRepository appUserRepository;

    public AppUserController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }


    @PostMapping("/register")
    public ResponseEntity<AppUser> save(@RequestBody AppUser appUser) {
        AppUser savedUser = appUserRepository.save(appUser);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AppUser> login(@RequestBody AppUser appUser) {
        return appUserRepository.findByEmailAndPassword(appUser.getEmail(), appUser.getPassword())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<AppUser>> findAll() {
        Iterable<AppUser> users = appUserRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/debug")
    public String debug() {
        return "AppUserController is working!";
    }


}
