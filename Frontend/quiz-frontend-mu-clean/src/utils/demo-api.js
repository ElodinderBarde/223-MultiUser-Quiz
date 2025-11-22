export const getDemoQuizQuestions = async () => {
  try {
    // Test CORS:
    fetch("http://localhost:8080/api/questions")
      .then((response) => response.json())
      .then((data) => console.log("✅ CORS funktioniert!", data))
      .catch((error) => console.error("❌ CORS Problem:", error));
  } catch (error) {
    console.error("Fehler beim Testen der API:", error);
  }
};
