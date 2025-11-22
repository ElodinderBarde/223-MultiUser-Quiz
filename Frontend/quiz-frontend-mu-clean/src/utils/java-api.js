import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/questions";

// HTTP-Client mit Timeout konfigurieren
const apiClient = axios.create({
  timeout: 10000, // 10 Sekunden Timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Quiz-Fragen laden (DAS WAR VORHER NICHT MÖGLICH!)
export const getQuizQuestions = async (amount = 5, category = null) => {
  try {
    console.log(`Lade ${amount} Quiz-Fragen für Kategorie:`, category);

    // Schritt 1: URL zusammenbauen
    let url = `${API_BASE_URL}/random?amount=${amount}`;
    if (category) {
      url = `${API_BASE_URL}/random?category=${category}&limit=${amount}`;
    }
    console.log("Quiz URL:", url);

    // Schritt 2: API-Aufruf
    const response = await apiClient.get(url);
    console.log("Quiz Response:", response);

    // Schritt 3: Fragen extrahieren
    const data = response.data;
    const questions = data;
    console.log("Quiz-Fragen geladen:", questions.length);

    // Schritt 4: Prüfen ob Fragen vorhanden
    if (questions.length === 0) {
      console.warn("Keine Fragen gefunden!");
    }

    // Schritt 5: Zurückgeben
    return questions;
  } catch (error) {
    console.error("Fehler beim Quiz-Laden:", error);
    console.error("Error Details:", error.message);
    return [];
  }
};

// Alle Quiz-Fragen laden
export const getAllQuizQuestions = async () => {
  try {
    const url = `${API_BASE_URL}/all`;
    const response = await apiClient.get(url);
    const data = response.data;
    const questions = data.results || data; // fallback if API returns array directly
    if (!questions || questions.length === 0) {
      console.warn("Keine Fragen gefunden!");
    }
    return questions;
  } catch (error) {
    console.error("Fehler beim Laden aller Fragen:", error);
    console.error("Error Details:", error.message);
    return [];
  }
};

export const createQuizQuestion = async (questionData) => {
  try {
    const url = `${API_BASE_URL}/create`;
    const response = await apiClient.post(url, questionData);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Erstellen der Frage:", error);
    console.error("Error Details:", error.message);
    return null;
  }
};

export const updateQuizQuestion = async (questionId, updatedData) => {
  try {
    const url = `${API_BASE_URL}/${questionId}/update`;
    const response = await apiClient.put(url, updatedData);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Frage:", error);
    console.error("Error Details:", error.message);
    return null;
  }
};

export const deleteQuizQuestion = async (questionId) => {
  try {
    const url = `${API_BASE_URL}/${questionId}`;
    await apiClient.delete(url);
    console.log("Frage erfolgreich gelöscht: ", questionId);
    return questionId;
  } catch (error) {
    console.error("Fehler beim Löschen der Frage:", error);
    console.error("Error Details:", error.message);
    return null;
  }
};
