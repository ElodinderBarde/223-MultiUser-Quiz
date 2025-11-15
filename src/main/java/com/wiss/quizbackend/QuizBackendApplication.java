package com.wiss.quizbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // ← Diese Annotation macht die "Magie"
public class QuizBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizBackendApplication.class, args);
	}

}
