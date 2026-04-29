import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useStudyRecords } from "./hooks/useStudyRecords";
import { PrimaryButton } from "./components/atoms/PrimaryButton";
import { SubmitFormModal } from "./components/organisms/SubmitFormModal";
import { StudyRecordTable } from "./components/organisms/StudyRecordTable";
import { LoadingOverlay } from "./components/molecules/LoadingOverlay";
import type { FormMode } from "./types/formMode";

export function App() {
  const { records, isLoading, addRecord, updateRecord, deleteRecord } = useStudyRecords();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("")
  const [formMode, setFormMode] = useState<FormMode>("add");

  const totalTime = records.reduce(
    (accumulator, currentValue) => accumulator + currentValue.time,
    0,
  );

  const onClickAdd = (() => {
    setSelectedId("");
    setFormMode("add");
    setIsModalOpen(true);
  });

  const onClickEdit = (id: string) => {
    setSelectedId(id);
    setFormMode("edit");

    const selectedRecord = records.find(r => r.id === id)
    if (!selectedRecord) {
      toast({
        title: "編集フォームで予期しないエラーが発生しました",
        status: "error",
        isClosable: true,
        duration: 3000,
      })
      setSelectedId("");
      return;
    }

    setIsModalOpen(true);
  };

  const onClickDelete = (id: string) => deleteRecord(id);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <SubmitFormModal
        isOpen={isModalOpen}
        formMode={formMode}
        id={selectedId}
        selectedRecord={records.find(r => r.id === selectedId)!}
        onClose={() => setIsModalOpen(false)}
        addRecord={addRecord}
        updateRecord={updateRecord}
      />
      <Heading as="h1" data-testid="title" mt="4" ml="4">
        学習記録アプリ
      </Heading>
      <Flex justifyContent="right" margin="4">
        <PrimaryButton label="追加" onClick={onClickAdd} leftIcon={<Plus />} />
      </Flex>
      <div>
        <StudyRecordTable
          records={records}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
        <div>
          <Text align="right" p="4">
            合計: {totalTime} / 1000 時間
          </Text>
        </div>
      </div>
    </>
  );
}

export default App;
