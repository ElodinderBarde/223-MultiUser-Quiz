package com.wiss.quizbackend.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = "createdBy")
@Table(name = "questions")
public  class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Version
    private  Integer version;

    @Column(nullable = false, length = 128)
    private String question;

    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    @CollectionTable(
            name = "question_incorrect_answers",
            joinColumns = @JoinColumn(name = "question_id")
    )

    @ElementCollection
    @Column(name = "incorrect_answer", nullable = false)
    private List<String> incorrectAnswers;

    @Column(nullable = false, length = 64)
    private String category;

    @Column(nullable = false, length = 128)
    private String difficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private AppUser createdBy;
}