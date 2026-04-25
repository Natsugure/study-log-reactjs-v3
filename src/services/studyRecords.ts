import { supabase } from '../lib/supabase';
import { StudyRecord } from '../types/studyRecords';

export const getAllRecords = async () => {
  const { data } = await supabase.from('study-record').select('*');
  return data?.map((record) => new StudyRecord(record.id, record.title, record.time, record.created_at))
};

export const insertNewRecord = async (record: Omit<StudyRecord, 'id' | 'created_at'>) => {
  const { error } = await supabase.from('study-record').insert(record);
  if (error) {
    console.error(error);
  }
};

export const deleteRecord = async (id: string) => {
  const { error } = await supabase.from('study-record').delete().eq('id', id);
  if (error) {
    console.error(error);
  }
};