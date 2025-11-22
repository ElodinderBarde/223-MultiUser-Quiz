// utils/localStorage.js - Hilfsfunktionen für Datenspeicherung

const QUESTIONS_KEY = "customQuestions"; // Schlüssel für localStorage

// Fragen speichern
export const saveCustomQuestions = (questions) => {
  try {
    // JavaScript-Array zu JSON-String konvertieren
    const jsonString = JSON.stringify(questions);
    localStorage.setItem(QUESTIONS_KEY, jsonString);
    console.log("Fragen gespeichert:", questions.length);
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
  }
};

// Fragen laden
export const loadCustomQuestions = () => {
  try {
    // JSON-String aus localStorage holen
    const jsonString = localStorage.getItem(QUESTIONS_KEY);

    // Wenn nichts gespeichert, leeres Array zurückgeben
    if (!jsonString) {
      return [];
    }

    // JSON-String zurück zu JavaScript-Array konvertieren
    const questions = JSON.parse(jsonString);
    console.log("Fragen geladen:", questions.length);
    return questions;
  } catch (error) {
    console.error("Fehler beim Laden:", error);
    return []; // Bei Fehler leeres Array zurückgeben
  }
};

// Eine einzelne Frage löschen
export const deleteCustomQuestion = (questionId) => {
  try {
    // Alle Fragen laden
    const questions = loadCustomQuestions();
    console.log("Fragen vor dem Löschen:", questions);

    // Alle ausser der zu löschenden Frage behalten
    const filteredQuestions = questions.filter((q) => q.id !== questionId);
    console.log("Gefilterte Fragen:", filteredQuestions);

    // Gefilterte Liste wieder speichern
    saveCustomQuestions(filteredQuestions);
    console.log("Frage gelöscht, verbleibend:", filteredQuestions.length);

    return filteredQuestions;
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
    return loadCustomQuestions(); // Bei Fehler ursprüngliche Liste zurückgeben
  }
};
