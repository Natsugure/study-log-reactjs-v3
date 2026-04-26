import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { LoadingOverlay } from "./LoadingOverlay";

describe("LoadingOverlay", () => {
  it("ローディング画面をみることができる", () => {
    render(
      <ChakraProvider>
        <LoadingOverlay />
      </ChakraProvider>
    );
    expect(screen.getByTestId("loading-text")).toBeInTheDocument();
  });
});
