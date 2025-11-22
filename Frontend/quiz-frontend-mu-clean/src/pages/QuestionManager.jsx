import { useState, useEffect } from "react";

import {
  getAllQuizQuestions,
  createQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
} from "../utils/java-api"; // Importieren der API-Funktion
import QuestionForm from "../components/question-form";
import QuestionCard from "../components/question-card";

const QuestionManager = () => {
  // Nur noch ein State für die gespeicherten Fragen
  const [savedQuestions, setSavedQuestions] = useState([]);

  // Fragen beim Start laden
  useEffect(() => {
    const loadQuestions = async () => {
      const loadedQuestions = await getAllQuizQuestions();
      setSavedQuestions(loadedQuestions);
    };
    loadQuestions();
  }, []);

  // Neue Frage hinzufügen (von QuestionForm aufgerufen)
  const handleQuestionSubmit = async (newQuestionData) => {
    try {
      const createdQuestion = await createQuizQuestion(newQuestionData);
      if (createdQuestion) {
        setSavedQuestions((prevQuestions) => [
          ...prevQuestions,
          createdQuestion,
        ]);
      }
    } catch (error) {
      console.error("Fehler beim Erstellen der Frage:", error);
    }
  };

  // Frage bearbeiten (von QuestionCard aufgerufen)
  const handleQuestionEdit = async (updatedQuestion) => {
    try {
      const response = await updateQuizQuestion(
        updatedQuestion.id,
        updatedQuestion
      );
      if (response) {
        const updatedQuestions = savedQuestions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        );

        setSavedQuestions(updatedQuestions);
        // TODO: Toast oder Benachrichtigung anzeigen
        console.log("Frage erfolgreich aktualisiert:", updatedQuestion);
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Frage:", error);
    }
  };

  // Frage löschen (von QuestionCard aufgerufen)
  const handleQuestionDelete = async (questionId) => {
    console.log("handleQuestionDelete aufgerufen mit ID:", questionId);

    try {
      const deletedID = await deleteQuizQuestion(questionId);
      console.log("Antwort vom Backend:", deletedID);

      if (deletedID) {
        const updatedQuestions = savedQuestions.filter(
          (q) => q.id !== questionId
        );
        setSavedQuestions(updatedQuestions);
      }
    } catch (error) {
      console.error("Fehler beim Löschen der Frage:", error);
    }
  };

  return (
    <div className="question-manager">
      <h1>Fragen verwalten</h1>

      {/* Formular zum Erstellen neuer Fragen */}
      <QuestionForm onQuestionSubmit={handleQuestionSubmit} />

      {/* Liste der gespeicherten Fragen */}
      <div className="saved-questions-section">
        <h2>Meine gespeicherten Fragen ({savedQuestions.length})</h2>

        {savedQuestions.length === 0 ? (
          <div className="no-questions">
            <p>📝 Noch keine Fragen erstellt.</p>
            <p>
              Verwenden Sie das Formular oben, um Ihre erste Frage zu erstellen!
            </p>
          </div>
        ) : (
          <div className="questions-list">
            {savedQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onEdit={handleQuestionEdit}
                onDelete={handleQuestionDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionManager;
