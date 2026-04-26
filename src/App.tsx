import { Flex, Heading, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useStudyRecords } from "./hooks/useStudyRecords";
import { PrimaryButton } from "./components/atoms/PrimaryButton";
import { SubmitFormModal } from "./components/organisms/SubmitFormModal";
import { StudyRecordTable } from "./components/organisms/StudyRecordTable";
import { LoadingOverlay } from "./components/molecules/LoadingOverlay";

export function App() {
  const { records, isLoading, addRecord, deleteRecord } = useStudyRecords();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalTime = records.reduce(
    (accumulator, currentValue) => accumulator + currentValue.time,
    0,
  );

  const onClickAdd = () => setIsModalOpen(true);

  const onClickDelete = (id: string) => {
    deleteRecord(id);
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <SubmitFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addRecord={addRecord}
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
