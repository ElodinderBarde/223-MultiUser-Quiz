import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Für Benutzerinteraktionen
import { describe, it, expect } from "vitest";
import Counter from "./counter";

describe("Counter Komponente", () => {
  it("sollte initial 0 anzeigen", () => {
    render(<Counter />);
    expect(screen.getByText("Aktueller Zähler: 0")).toBeInTheDocument();
  });

  it("sollte den Zähler erhöhen, wenn der Knopf geklickt wird", async () => {
    const user = userEvent.setup(); // userEvent initialisieren
    render(<Counter />);

    const button = screen.getByText("Erhöhen"); // Den Knopf finden
    await user.click(button); // Den Klick simulieren (await ist wichtig!)

    expect(screen.getByText("Aktueller Zähler: 1")).toBeInTheDocument();

    await user.click(button); // Nochmals klicken
    expect(screen.getByText("Aktueller Zähler: 2")).toBeInTheDocument();
  });
});
