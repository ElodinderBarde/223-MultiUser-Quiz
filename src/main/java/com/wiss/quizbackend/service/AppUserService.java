package com.wiss.quizbackend.service;

import com.wiss.quizbackend.entity.AppUser;
import com.wiss.quizbackend.entity.RoleEnum;
import com.wiss.quizbackend.repository.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;;

/**
 * Service Layer für User-Management.
 *
 * Verantwortlichkeiten:
 * - User Registration mit Password Hashing
 * - Username/Email Validierung
 * - User Authentication (Vorbereitung für Login)
 *
 * @Service markiert diese Klasse als Spring Service Component
 * @Transactional macht alle Methoden transaktional (Alles oder Nichts)
 */


@Service
@Transactional
@RequiredArgsConstructor // Erzeugt Constructor Injection AUTOMATISCH
public class AppUserService {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    /**
     * Constructor Injection statt @Autowired
     * Vorteile:
     * - Explizite Dependencies
     * - Einfacher zu testen (Mock injection)
     * - Immutable fields (final)
     */


    public AppUser registerUser(String username,
                                String email,
                                String rawPassword,
                                RoleEnum role) {


        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }
        String hashedPassword = passwordEncoder.encode(rawPassword);
        RoleEnum assignedRole = (role != null) ? role : RoleEnum.USER;
        AppUser newUser = AppUser.builder()
                .username(username)
                .email(email)
                .password(hashedPassword)
                .role(assignedRole)
                .build();
        return userRepository.save(newUser);

    }
//========================================
    //Login (Aûthentication)
    //========================================


    public Optional<AppUser> authenticate(String username, String password) {

        Optional<AppUser> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            AppUser user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();


    }

    //========================================
    // Find Methods
    //========================================


    public Optional<AppUser> findByUsername(String username) {
        return userRepository.findByUsername(username);

    }

    public Optional<AppUser> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    //========================================
    // Availability Checks
    //========================================


    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);

    }


    //========================================
    //EMAIL Validiation
    //========================================


    public boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email != null && email.matches(emailRegex);
    }

}






