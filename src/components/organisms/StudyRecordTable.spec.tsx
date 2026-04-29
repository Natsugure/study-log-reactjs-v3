import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { StudyRecordTable } from "./StudyRecordTable";
import { StudyRecord } from "../../types/studyRecords";

describe("StudyRecordTable", () => {
  it("テーブルをみることができる", () => {
    const records: StudyRecord[] = [
      new StudyRecord("1", "React", 5, "2026-04-27"),
    ];
    render(<StudyRecordTable records={records} onClickEdit={vi.fn()} onClickDelete={vi.fn()} />);

    expect(screen.getByTestId("table-container")).toBeInTheDocument();
  });
});
