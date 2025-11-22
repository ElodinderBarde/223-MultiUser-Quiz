import { sum, subtract } from "./math.js"; // Unsere Funktionen importieren
import { describe, test, expect } from "vitest"; // Wichtige Bausteine von Vitest importieren

// Vitest ist ein Test-Framework, das in Vite integriert ist und eine ähnliche API wie Jest hat.
describe("Math functions", () => {
  // Gruppiert zusammengehörige Tests

  // Testgruppe für die sum-Funktion
  describe("sum", () => {
    test("calculate the sum of two numbers", () => {
      // Test für die sum-Funktion
      expect(sum(1, 2)).toBe(3); // Erwartet, dass 1 + 2 = 3 ist
    });

    test("calculate the sum of two negative numbers", () => {
      // Test für die sum-Funktion mit negativen Zahlen
      expect(sum(-1, -2)).toBe(-3); // Erwartet, dass -1 + -2 = -3 ist
    });
  });

  // Testgruppe für die subtract-Funktion
  describe("subtract", () => {
    test("calculate the difference of two numbers", () => {
      // Test für die subtract-Funktion
      expect(subtract(5, 2)).toBe(3); // Erwartet, dass 5 - 2 = 3 ist
    });

    test("calculate the difference of two negative numbers", () => {
      // Test für die subtract-Funktion mit negativen Zahlen
      expect(subtract(-5, -2)).toBe(-3); // Erwartet, dass -5 - -2 = -3 ist
    });
  });
});
