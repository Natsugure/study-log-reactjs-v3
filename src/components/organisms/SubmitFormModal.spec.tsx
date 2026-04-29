import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SubmitFormModal } from "./SubmitFormModal";
import userEvent from "@testing-library/user-event";
import type React from "react";

const renderModal = (props?: Partial<React.ComponentProps<typeof SubmitFormModal>>) => {
  render(
    <SubmitFormModal
      formMode="add"
      id=""
      selectedRecord={{ title: "", time: 0 }}
      isOpen={true}
      onClose={vi.fn()}
      addRecord={vi.fn()}
      updateRecord={vi.fn()}
      {...props}
    />,
  );
};

describe("SubmitFormModal 新規登録テスト", () => {
  it("モーダルのタイトルが「学習記録 新規登録」であること", () => {
    renderModal();

    expect(screen.getByText("学習記録 新規登録")).toBeInTheDocument();
  });

  it("学習内容が未入力である場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal();

    // Inputに何も入力しない状態で登録ボタンを押す
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("内容は入力必須です")).toBeInTheDocument();
  });

  it("学習時間が未入力である場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByTestId("study-detail-input"), "記録1");
    const hourInput = screen.getByTestId("study-hour-input");
    await user.clear(hourInput); // デフォルト値の0をクリア
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(await screen.findByText("時間は入力必須です")).toBeInTheDocument();
  });

  it("学習時間が0時間未満である場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByTestId("study-detail-input"), "記録1");
    const hourInput = screen.getByTestId("study-hour-input");
    await user.clear(hourInput); // デフォルト値の0をクリア
    await user.type(hourInput, "0"); // ユーザー自身が0時間で入力
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(
      await screen.findByText("時間は1~24の間で入力してください"),
    ).toBeInTheDocument();
  });

  it("学習時間が24時間を超える場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByTestId("study-detail-input"), "記録1");
    const hourInput = screen.getByTestId("study-hour-input");
    await user.clear(hourInput); // デフォルト値の0をクリア
    await user.type(hourInput, "25");
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(
      await screen.findByText("時間は1~24の間で入力してください"),
    ).toBeInTheDocument();
  });
});

describe("SubmitFormModal レコード更新テスト", () => {
  it("モーダルのタイトルが「学習記録 編集」であること", () => {
    renderModal({ formMode: "edit" });

    expect(screen.getByText("学習記録 編集")).toBeInTheDocument();
  });

  it("selectedRecordのデータがフォームの初期値として表示されること", () => {
    renderModal({
      formMode: "edit",
      selectedRecord: { title: "記録テスト", time: 3 },
    });

    expect(screen.getByTestId("study-detail-input")).toHaveValue("記録テスト");
    expect(screen.getByTestId("study-hour-input")).toHaveValue(3);
  });

  it("登録ボタンをクリックするとupdateRecordが正しい引数で呼ばれること", async () => {
    const user = userEvent.setup();
    const updateRecord = vi.fn().mockResolvedValue(undefined);
    const addRecord = vi.fn();
    renderModal({
      formMode: "edit",
      id: "test-id-1",
      selectedRecord: { title: "記録テスト", time: 3 },
      updateRecord,
      addRecord,
    });

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(updateRecord).toHaveBeenCalledWith("test-id-1", "記録テスト", 3);
    expect(addRecord).not.toHaveBeenCalled();
  });

  it("登録後にモーダルが閉じること", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const updateRecord = vi.fn().mockResolvedValue(undefined);
    renderModal({
      formMode: "edit",
      id: "test-id-1",
      selectedRecord: { title: "記録テスト", time: 3 },
      onClose,
      updateRecord,
    });

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("学習内容が未入力である場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal({
      formMode: "edit",
      selectedRecord: { title: "", time: 3 },
    });

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("内容は入力必須です")).toBeInTheDocument();
  });

  it("学習時間が未入力である場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal({
      formMode: "edit",
      selectedRecord: { title: "記録テスト", time: 3 },
    });

    const hourInput = screen.getByTestId("study-hour-input");
    await user.clear(hourInput);
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(await screen.findByText("時間は入力必須です")).toBeInTheDocument();
  });

  it("学習時間が0時間未満である場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal({
      formMode: "edit",
      selectedRecord: { title: "記録テスト", time: 3 },
    });

    const hourInput = screen.getByTestId("study-hour-input");
    await user.clear(hourInput);
    await user.type(hourInput, "0");
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(
      await screen.findByText("時間は1~24の間で入力してください"),
    ).toBeInTheDocument();
  });

  it("学習時間が24時間を超える場合にエラーが表示されること", async () => {
    const user = userEvent.setup();
    renderModal({
      formMode: "edit",
      selectedRecord: { title: "記録テスト", time: 3 },
    });

    const hourInput = screen.getByTestId("study-hour-input");
    await user.clear(hourInput);
    await user.type(hourInput, "25");
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(
      await screen.findByText("時間は1~24の間で入力してください"),
    ).toBeInTheDocument();
  });
});
