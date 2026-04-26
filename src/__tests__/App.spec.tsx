import App from "../App";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe("App.tsx Test", () => {
  it("タイトルが学習記録アプリであること", async () => {
    render(<App />);

    await waitFor(() => expect(screen.queryByTestId("loading-text")).not.toBeInTheDocument());
    expect(screen.getByTestId("title")).toHaveTextContent("学習記録アプリ");
  });

  it("「追加」ボタンが表示されること", async () => {
    render(<App />);

    await waitFor(() => expect(screen.queryByTestId("loading-text")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });
});