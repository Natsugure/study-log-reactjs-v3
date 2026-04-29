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
  const [isLoading, setIsLoading] = useState(true);

  // 本当はサービスも含めてエラーハンドリングすべき。学習用なので、時間があるときに帰ってきて修正。
  async function fetchAll(): Promise<StudyRecord[] | undefined> {
    const records = await fetchAllRecords();
    return records;
  }

  async function add(title: string, time: number) {
    if (!title || !time) {
      return;
    }

    setIsLoading(true);
    await insertNewRecord({ title: title, time: time });
    setRecords(await fetchAll() || []);
    setIsLoading(false);
  }

  async function update(id: string, title: string, time: number) {
    if (!title || !time) {
      return;
    }

    setIsLoading(true);
    await updateRecord({ id: id, title: title, time: time });
    setRecords(await fetchAll() || []);
    setIsLoading(false);
  }

  async function remove(id: string) {
    setIsLoading(true);
    await deleteRecord(id);
    setRecords(await fetchAll() || []);
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAll()
      setRecords(data || []);
      setIsLoading(false);
    }
    void fetchData();
  }, []);

  return {
    records,
    isLoading,
    addRecord: add,
    updateRecord: update,
    deleteRecord: remove,
  };
}
