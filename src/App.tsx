import { Box, Flex, Heading, IconButton, Input, NumberInput, NumberInputField, Spinner, Text } from '@chakra-ui/react'
import { Trash2 } from "lucide-react"
import { useState } from 'react'
import { useStudyRecords } from './hooks/useStudyRecords'
import { PrimaryButton } from './components/atoms/PrimaryButton';

export function App() {
  const { records, isLoading, error, addRecord, deleteRecord } = useStudyRecords()

  const [newStudyDetail, setNewStudyDetail] = useState('');
  const [newStudyHour, setNewStudyHour] = useState('0');

  const onClickAdd = () => {
    const intHour = parseInt(newStudyHour);
    addRecord(newStudyDetail, intHour)
    setNewStudyDetail('')
    setNewStudyHour('0')
  }

  const onClickDelete = (id: string) => {
    deleteRecord(id)
  }

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
          <Text data-testid="loading-text" color="white">読み込み中…</Text>
        </Box>
      )}
      <Heading as="h1" data-testid="title">学習記録アプリ</Heading>
      <div>
        <Flex>
          <Box p='2'>
            <Text>学習内容</Text>
          </Box>
          <Box p='2'>
            <Input
              data-testid="study-detail-input"
              value={newStudyDetail}
              onChange={(e) => setNewStudyDetail(e.target.value)}
              height="28px"
            ></Input>
          </Box>
        </Flex>
        <Flex>
          <Box p='2'>
            <Text>学習時間</Text>
          </Box>
          <Box p='2'>
            <NumberInput
              data-testid="study-hour-input"
              value={newStudyHour}
              onChange={(valueAsString) => setNewStudyHour(valueAsString)}
              min={0}
              max={24}
            >
              <NumberInputField height="28px" width="100px"/>
            </NumberInput>
          </Box>
          <Box p='2'>
            <Text>時間(h)</Text>
          </Box>
        </Flex>
      </div>
      <div>
        <ul>
          {records.map((item, id) => {
            return (
              <li key={id}>
                <div>
                  {item.title} {item.time}時間
                  <IconButton
                    data-testid="delete-button"
                    aria-label="削除"
                    icon={<Trash2 />}
                    colorScheme="red"
                    size="xs"
                    onClick={() => {onClickDelete(item.id)}} 
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <PrimaryButton label="登録" onClick={onClickAdd} />
          {error && <span data-testid="error-message">'入力されていない項目があります'</span>}
        </div>
        <div>
          <p>合計時間 0 / 1000 (h)</p>
        </div>
      </div>
    </>
  )
}

export default App
