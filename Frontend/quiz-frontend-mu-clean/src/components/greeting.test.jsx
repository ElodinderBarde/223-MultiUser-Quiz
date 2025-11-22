import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Greeting from "./greeting";

describe("Greeting Komponente", () => {
  it('sollte "Hello, Player 456!" anzeigen, wenn kein Name übergeben wird', () => {
    render(<Greeting />); // Die Komponente "rendern" (im Speicher)

    // screen.getByText() sucht nach einem Element mit dem exakten Textinhalt
    expect(screen.getByText("Hello, Player 456!")).toBeInTheDocument();
  });

  it("sollte den übergebenen Namen anzeigen", () => {
    render(<Greeting name="World" />);

    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    // Man könnte auch prüfen, dass "Hello, Player!" NICHT da ist:
    // expect(screen.queryByText('Hello, Player!')).not.toBeInTheDocument();
    // queryByText gibt null zurück, wenn nichts gefunden wird, anstatt einen Fehler zu werfen.
  });
});
