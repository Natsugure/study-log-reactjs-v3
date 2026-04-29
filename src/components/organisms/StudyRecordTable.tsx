import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import type { StudyRecord } from "../../types/studyRecords";

export type Props = {
  records: StudyRecord[];
  onClickEdit: (id: string) => void;
  onClickDelete: (id: string) => void;
};

export function StudyRecordTable(props: Props) {
  const { records, onClickEdit, onClickDelete } = props;

  return (
    <TableContainer data-testid="table-container" margin="4">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="60%">学習内容</Th>
            <Th w="20%" isNumeric>時間</Th>
            <Th w="20%"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((item) => (
            <Tr key={item.id} data-testid="table-row">
              <Td>{item.title}</Td>
              <Td isNumeric>{item.time}時間</Td>
              <Td>
                <Flex gap="2">
                  <IconButton
                    aria-label="編集"
                    icon={<Pencil size={16} />}
                    colorScheme="teal"
                    size="xs"
                    onClick={() => onClickEdit(item.id)}
                  />
                  <IconButton
                    data-testid="delete-button"
                    aria-label="削除"
                    icon={<Trash2 size={16} />}
                    colorScheme="red"
                    size="xs"
                    onClick={() => onClickDelete(item.id)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
