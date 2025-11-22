import { useState, useEffect } from "react";
import Button from "./button";

const QuestionCard = ({ question, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  console.log("QuestionCard Props:", {
    question,
    onEdit,
    onDelete,
  });

  // States mit leeren Defaults
  const [editQuestion, setEditQuestion] = useState("");
  const [editCorrectAnswer, setEditCorrectAnswer] = useState("");
  const [editIncorrectAnswer1, setEditIncorrectAnswer1] = useState("");
  const [editIncorrectAnswer2, setEditIncorrectAnswer2] = useState("");
  const [editIncorrectAnswer3, setEditIncorrectAnswer3] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("");

  // States synchronisieren wenn question sich ändert
  useEffect(() => {
    if (question && question.incorrectAnswers) {
      setEditQuestion(question.question || "");
      setEditCorrectAnswer(question.correctAnswer || "");
      setEditIncorrectAnswer1(question.incorrectAnswers[0] || "");
      setEditIncorrectAnswer2(question.incorrectAnswers[1] || "");
      setEditIncorrectAnswer3(question.incorrectAnswers[2] || "");
      setEditCategory(question.category || "");
      setEditDifficulty(question.difficulty || "");
    }
  }, [question]);

  // Loading state
  if (!question) {
    return <div className="question-card">Loading question...</div>;
  }

  // Weitere Sicherheitsprüfung
  if (!question.incorrectAnswers || question.incorrectAnswers.length < 3) {
    return <div className="question-card">Invalid question data</div>;
  }

  const startEditing = () => {
    setIsEditing(true);
    // States mit aktuellen Werten füllen
    setEditQuestion(question?.question);
    setEditCorrectAnswer(question?.correctAnswer);
    setEditIncorrectAnswer1(question?.incorrectAnswers[0] || "");
    setEditIncorrectAnswer2(question?.incorrectAnswers[1] || "");
    setEditIncorrectAnswer3(question?.incorrectAnswers[2] || "");
    setEditCategory(question?.category);
    setEditDifficulty(question?.difficulty);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    const updatedQuestion = {
      ...question, // ID und andere Felder beibehalten
      question: editQuestion,
      correctAnswer: editCorrectAnswer,
      incorrectAnswers: [
        editIncorrectAnswer1,
        editIncorrectAnswer2,
        editIncorrectAnswer3,
      ],
      category: editCategory,
      difficulty: editDifficulty,
    };

    onEdit(updatedQuestion);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Sind Sie sicher, dass Sie diese Frage löschen möchten?"
    );
    if (isConfirmed) {
      onDelete(question.id);
    }
  };

  return (
    <div className="question-card">
      {isEditing ? (
        // BEARBEITUNGS-MODUS
        <div className="editing-form">
          <h3>Frage bearbeiten</h3>

          <div className="edit-field">
            <label>Frage:</label>
            <textarea
              value={editQuestion}
              onChange={(e) => setEditQuestion(e.target.value)}
              className="form-input"
              rows="2"
            />
          </div>

          <div className="edit-field">
            <label>Richtige Antwort:</label>
            <input
              type="text"
              value={editCorrectAnswer}
              onChange={(e) => setEditCorrectAnswer(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="edit-answers-grid">
            <div className="edit-field">
              <label>Falsche Antwort 1:</label>
              <input
                type="text"
                value={editIncorrectAnswer1}
                onChange={(e) => setEditIncorrectAnswer1(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="edit-field">
              <label>Falsche Antwort 2:</label>
              <input
                type="text"
                value={editIncorrectAnswer2}
                onChange={(e) => setEditIncorrectAnswer2(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="edit-field">
              <label>Falsche Antwort 3:</label>
              <input
                type="text"
                value={editIncorrectAnswer3}
                onChange={(e) => setEditIncorrectAnswer3(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="edit-actions">
            <Button
              text="✅ Speichern"
              onAnswerClick={saveChanges}
              className="save-button"
            />
            <Button
              text="❌ Abbrechen"
              onAnswerClick={cancelEditing}
              className="cancel-button"
            />
          </div>
        </div>
      ) : (
        // ANZEIGE-MODUS
        <>
          <div className="question-header">
            <h3>{question.question}</h3>
            <div className="question-meta">
              <span className="category-badge">{question.category}</span>
              <span className="difficulty-badge">{question.difficulty}</span>
            </div>
          </div>

          <div className="question-answers">
            <div className="correct-answer">
              <strong>✅ Richtig:</strong> {question.correctAnswer}
            </div>
            <div className="incorrect-answers">
              <strong>❌ Falsch:</strong>
              <ul>
                {question.incorrectAnswers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="question-actions">
            <Button
              text="✏️ Bearbeiten"
              onAnswerClick={startEditing}
              className="edit-button"
            />
            <Button
              text="🗑️ Löschen"
              onAnswerClick={handleDelete}
              className="delete-button"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionCard;
