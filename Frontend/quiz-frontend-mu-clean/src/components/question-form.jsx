import { useState } from "react";
import Button from "./button";

const QuestionForm = ({ onQuestionSubmit }) => {
  // States nur für das Formular
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswer1, setIncorrectAnswer1] = useState("");
  const [incorrectAnswer2, setIncorrectAnswer2] = useState("");
  const [incorrectAnswer3, setIncorrectAnswer3] = useState("");
  const [category, setCategory] = useState("custom");
  const [difficulty, setDifficulty] = useState("medium");

  // Error States
  const [questionError, setQuestionError] = useState("");
  const [correctAnswerError, setCorrectAnswerError] = useState("");
  const [incorrectAnswer1Error, setIncorrectAnswer1Error] = useState("");
  const [incorrectAnswer2Error, setIncorrectAnswer2Error] = useState("");
  const [incorrectAnswer3Error, setIncorrectAnswer3Error] = useState("");
  const [duplicateError, setDuplicateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler Funktionen - gleich wie vorher
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    if (questionError) setQuestionError("");
  };

  // ... alle anderen Handler wie vorher

  const validateForm = () => {
    let isValid = true;

    // Alle Errors zurücksetzen
    setQuestionError("");
    setCorrectAnswerError("");
    setIncorrectAnswer1Error("");
    setIncorrectAnswer2Error("");
    setIncorrectAnswer3Error("");
    setDuplicateError("");

    if (!question.trim()) {
      setQuestionError("Frage ist erforderlich");
      isValid = false;
    } else if (question.length < 10) {
      setQuestionError("Frage muss mindestens 10 Zeichen haben");
      isValid = false;
    }

    if (!correctAnswer.trim()) {
      setCorrectAnswerError("Richtige Antwort ist erforderlich");
      isValid = false;
    }

    if (!incorrectAnswer1.trim()) {
      setIncorrectAnswer1Error("Falsche Antwort 1 ist erforderlich");
      isValid = false;
    }

    if (!incorrectAnswer2.trim()) {
      setIncorrectAnswer2Error("Falsche Antwort 2 ist erforderlich");
      isValid = false;
    }

    if (!incorrectAnswer3.trim()) {
      setIncorrectAnswer3Error("Falsche Antwort 3 ist erforderlich");
      isValid = false;
    }

    // Duplikate prüfen
    if (
      correctAnswer.trim() &&
      incorrectAnswer1.trim() &&
      incorrectAnswer2.trim() &&
      incorrectAnswer3.trim()
    ) {
      const allAnswers = [
        correctAnswer.toLowerCase().trim(),
        incorrectAnswer1.toLowerCase().trim(),
        incorrectAnswer2.toLowerCase().trim(),
        incorrectAnswer3.toLowerCase().trim(),
      ];

      const uniqueAnswers = new Set(allAnswers);
      if (uniqueAnswers.size !== allAnswers.length) {
        setDuplicateError("Antworten dürfen nicht identisch sein");
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Neue Frage an Parent-Komponente weitergeben
    const newQuestion = {
      question: question,
      correctAnswer: correctAnswer,
      incorrectAnswers: [incorrectAnswer1, incorrectAnswer2, incorrectAnswer3],
      category: category,
      difficulty: difficulty,
    };

    // Parent-Komponente übernimmt das Speichern
    onQuestionSubmit(newQuestion);

    // Form zurücksetzen
    setQuestion("");
    setCorrectAnswer("");
    setIncorrectAnswer1("");
    setIncorrectAnswer2("");
    setIncorrectAnswer3("");
    setCategory("custom");
    setDifficulty("medium");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>Neue Quiz-Frage erstellen</h2>

      {/* Question Input */}
      <div className="form-group">
        <label htmlFor="question">Frage *</label>
        <textarea
          id="question"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Geben Sie Ihre Frage ein..."
          className={`form-input ${questionError ? "form-input--error" : ""}`}
          rows="3"
        />
        {questionError && (
          <span className="error-message">{questionError}</span>
        )}
      </div>

      {/* Correct Answer */}
      <div className="form-group">
        <label htmlFor="correctAnswer">Richtige Antwort *</label>
        <input
          type="text"
          id="correctAnswer"
          value={correctAnswer}
          onChange={(e) => {
            setCorrectAnswer(e.target.value);
            if (correctAnswerError) setCorrectAnswerError("");
          }}
          placeholder="Richtige Antwort"
          className={`form-input ${
            correctAnswerError ? "form-input--error" : ""
          }`}
        />
        {correctAnswerError && (
          <span className="error-message">{correctAnswerError}</span>
        )}
      </div>

      {/* Incorrect Answers Grid */}
      <div className="answers-grid">
        <div className="form-group">
          <label htmlFor="incorrectAnswer1">Falsche Antwort 1 *</label>
          <input
            type="text"
            id="incorrectAnswer1"
            value={incorrectAnswer1}
            onChange={(e) => {
              setIncorrectAnswer1(e.target.value);
              if (incorrectAnswer1Error) setIncorrectAnswer1Error("");
            }}
            placeholder="Falsche Antwort 1"
            className={`form-input ${
              incorrectAnswer1Error ? "form-input--error" : ""
            }`}
          />
          {incorrectAnswer1Error && (
            <span className="error-message">{incorrectAnswer1Error}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="incorrectAnswer2">Falsche Antwort 2 *</label>
          <input
            type="text"
            id="incorrectAnswer2"
            value={incorrectAnswer2}
            onChange={(e) => {
              setIncorrectAnswer2(e.target.value);
              if (incorrectAnswer2Error) setIncorrectAnswer2Error("");
            }}
            placeholder="Falsche Antwort 2"
            className={`form-input ${
              incorrectAnswer2Error ? "form-input--error" : ""
            }`}
          />
          {incorrectAnswer2Error && (
            <span className="error-message">{incorrectAnswer2Error}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="incorrectAnswer3">Falsche Antwort 3 *</label>
          <input
            type="text"
            id="incorrectAnswer3"
            value={incorrectAnswer3}
            onChange={(e) => {
              setIncorrectAnswer3(e.target.value);
              if (incorrectAnswer3Error) setIncorrectAnswer3Error("");
            }}
            placeholder="Falsche Antwort 3"
            className={`form-input ${
              incorrectAnswer3Error ? "form-input--error" : ""
            }`}
          />
          {incorrectAnswer3Error && (
            <span className="error-message">{incorrectAnswer3Error}</span>
          )}
        </div>
      </div>

      {/* Category & Difficulty */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Kategorie</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          >
            <option value="custom">Eigene Fragen</option>
            <option value="sports">Sport</option>
            <option value="games">Spiele</option>
            <option value="movies">Filme</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Schwierigkeit</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="form-input"
          >
            <option value="easy">Einfach</option>
            <option value="medium">Mittel</option>
            <option value="hard">Schwer</option>
          </select>
        </div>
      </div>

      {/* Duplicate Error */}
      {duplicateError && <div className="error-summary">{duplicateError}</div>}

      {/* Submit Button */}
      <div className="form-submit">
        <Button
          text={isSubmitting ? "🔄 Speichern..." : "✅ Frage erstellen"}
          onAnswerClick={handleSubmit}
          disabled={isSubmitting}
          className="submit-button"
        />
      </div>
    </form>
  );
};

export default QuestionForm;
