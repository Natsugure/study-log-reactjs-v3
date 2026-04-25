import { useState, useEffect } from 'react';
import { StudyRecord } from '../types/studyRecords';
import { getAllRecords, insertNewRecord, deleteRecord } from '../services/studyRecords';

export function useStudyRecords() {
  const [records, setRecords] = useState<StudyRecord[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchAll() {
    setIsLoading(true)
    const records = await getAllRecords()

    if (records === undefined) {
      setError("データの取得に失敗しました")
      return
    }

    setError("")
    setRecords(records)
    console.log(records)
    setIsLoading(false)
  }

  async function add(title: string, time: number) {
    if (!title || !time) {
      setError('入力されていないの項目があります');
      return;
    }
    setError('');

    await insertNewRecord({ title: title, time: time })

    await fetchAll()
  }

  async function remove(id: string) {
    await deleteRecord(id)

    await fetchAll()
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAll()
    }
    fetchData()
  }, [])

  return { records, isLoading, error, addRecord: add, deleteRecord: remove }
}