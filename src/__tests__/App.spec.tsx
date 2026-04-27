import App from "../App";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import * as studyRecordService from "../services/studyRecords"
import { StudyRecord } from "../types/studyRecords"

vi.mock("../services/studyRecords"); 

describe("App.tsx Test", () => {
  beforeEach(() => {
    vi.mocked(studyRecordService.getAllRecords).mockResolvedValue([]);
  })

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

describe("学習記録の登録", () => {
  beforeEach(() => {
    vi.mocked(studyRecordService.insertNewRecord).mockResolvedValue(undefined);
    vi.mocked(studyRecordService.deleteRecord).mockResolvedValue(undefined);

    vi.mocked(studyRecordService.getAllRecords).mockResolvedValueOnce([
      new StudyRecord("1", "記録1", 5, "2026-04-01"),
    ])
    .mockResolvedValueOnce([
      new StudyRecord("1", "記録1", 5, "2026-04-01"),
      new StudyRecord("2", "記録2", 3, "2026-04-27"),
    ])
  })

  it("新しい学習記録を登録するとテーブルに追加されること", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => expect(screen.queryByTestId("loading-text")).not.toBeInTheDocument());

    expect(screen.getAllByTestId("table-row")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "追加" }));

    // フォームを入力して登録ボタンを押す
    await user.type(screen.getByTestId("study-detail-input"), "記録2");
    const hourInput = screen.getByTestId("study-hour-input");
    await user.clear(hourInput);  // デフォルト値の0をクリア
    await user.type(hourInput, "3");
    await user.click(screen.getByRole("button", { name: "登録" }));

    // 登録後、行が2行になって新しいレコードが表示されていることを確認
    await waitFor(() => expect(screen.getAllByTestId("table-row")).toHaveLength(2));
    expect(screen.getByText("記録2")).toBeInTheDocument();
  });
});

describe("学習記録の削除", () => {
  beforeEach(() => {
    vi.mocked(studyRecordService.insertNewRecord).mockResolvedValue(undefined);
    vi.mocked(studyRecordService.deleteRecord).mockResolvedValue(undefined);

    vi.mocked(studyRecordService.getAllRecords).mockResolvedValueOnce([
      new StudyRecord("1", "記録1", 5, "2026-04-01"),
      new StudyRecord("2", "記録2", 3, "2026-04-27"),
    ])
    .mockResolvedValueOnce([
      new StudyRecord("1", "記録1", 5, "2026-04-01"),
    ]);
  })

  it("学習記録を削除するとテーブルから削除されること", async () => {
    const user = userEvent.setup();
    render(<App />)

    await waitFor(() => expect(screen.queryByTestId("loading-text")).not.toBeInTheDocument());

    const rows = screen.getAllByTestId("table-row");
    expect(rows).toHaveLength(2);

    const deleteTargetRow = rows.find(row => within(row).queryByText("記録2"));
    await user.click(within(deleteTargetRow!).getByTestId("delete-button"));

    await waitFor(() => expect(screen.getAllByTestId("table-row")).toHaveLength(1));
    expect(screen.queryByText("記録2")).not.toBeInTheDocument()
  });
})