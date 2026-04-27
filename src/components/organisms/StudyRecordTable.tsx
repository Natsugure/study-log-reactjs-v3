import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import type { StudyRecord } from "../../types/studyRecords";

export type Props = {
  records: StudyRecord[];
  onClickDelete: (id: string) => void;
};

export function StudyRecordTable(props: Props) {
  const { records, onClickDelete } = props;

  return (
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
            <Tr key={id} data-testid="table-row">
              <Td>{item.title}</Td>
              <Td>{item.time}時間</Td>
              <Td>
                <IconButton
                  data-testid="delete-button"
                  aria-label="削除"
                  icon={<Trash2 size={16} />}
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
  );
}
