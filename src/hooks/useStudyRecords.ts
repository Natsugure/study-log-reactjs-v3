import { useState, useEffect } from "react";
import { StudyRecord } from "../types/studyRecords";
import {
  fetchAllRecords,
  insertNewRecord,
  updateRecord,
  deleteRecord,
} from "../services/studyRecords";

export function useStudyRecords() {
  const [records, setRecords] = useState<StudyRecord[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchAll() {
    setIsLoading(true);
    const records = await fetchAllRecords();

    if (records === undefined) {
      setError("データの取得に失敗しました");
      setIsLoading(false);
      return;
    }

    setError("");
    setRecords(records);
    setIsLoading(false);
  }

  async function add(title: string, time: number) {
    if (!title || !time) {
      setError("入力されていないの項目があります");
      return;
    }
    setError("");

    setIsLoading(true);
    await insertNewRecord({ title: title, time: time });
    await fetchAll();
    setIsLoading(false);
  }

  async function update(id: string, title: string, time: number) {
    if (!title || !time) {
      setError("入力されていないの項目があります");
      return;
    }
    setError("");

    setIsLoading(true);
    await updateRecord({ id: id, title: title, time: time });
    await fetchAll();
    setIsLoading(false);
  }

  async function remove(id: string) {
    setIsLoading(true);
    await deleteRecord(id);
    await fetchAll();
    setIsLoading(false);
  }

  useEffect(() => {
    void fetchAll();
  }, []);

  return {
    records,
    isLoading,
    error,
    addRecord: add,
    updateRecord: update,
    deleteRecord: remove,
  };
}
