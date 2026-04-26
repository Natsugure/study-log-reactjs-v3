import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useStudyRecords } from "./hooks/useStudyRecords";
import { PrimaryButton } from "./components/atoms/PrimaryButton";
import { SubmitFormModal } from "./components/organisms/SubmitFormModal";

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
      {isLoading && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex="overlay"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={3}
        >
          <Spinner size="xl" color="white" />
          <Text data-testid="loading-text" color="white">
            読み込み中…
          </Text>
        </Box>
      )}
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
        <TableContainer data-testid="table-container" margin="4">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>学習内容</Th>
                <Th>時間</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((item, id) => (
                <Tr key={id}>
                  <Td>{item.title}</Td>
                  <Td>{item.time}時間</Td>
                  <Td>
                    <IconButton
                      data-testid="delete-button"
                      aria-label="削除"
                      icon={<Trash2 size={16}/>}
                      colorScheme="red"
                      size="xs"
                      onClick={() => onClickDelete(item.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
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
