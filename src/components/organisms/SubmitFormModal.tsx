import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { SecondaryButton } from "../atoms/SecondaryButton";
import type { FormMode } from "../../types/formMode";
import { useEffect } from "react";

type Props = {
  formMode: FormMode;
  id: string;
  selectedRecord: FormValues;
  isOpen: boolean;
  onClose: () => void;
  addRecord: (title: string, time: number) => Promise<void>;
  updateRecord: (id: string, title: string, time: number) => Promise<void>;
};

type FormValues = {
  title: string;
  time: number;
};

export function SubmitFormModal(props: Props) {
  const {
    formMode,
    id,
    selectedRecord,
    isOpen,
    onClose,
    addRecord,
    updateRecord,
  } = props;

  const defaultValues: FormValues = {
    title: formMode === "edit" ? selectedRecord.title : "",
    time: formMode === "edit" ? selectedRecord.time : 0,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({defaultValues});

  const header = formMode === "add" ? "学習記録 新規登録" : "学習記録 編集";

  const onSubmit = async (data: FormValues) => {
    if (formMode === "edit") await updateRecord(id, data.title, data.time);
    else await addRecord(data.title, data.time);

    reset();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      reset(formMode === "edit" ? selectedRecord : defaultValues)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>学習内容</FormLabel>
                <Input
                  data-testid="study-detail-input"
                  {...register("title", { required: "内容は入力必須です" })}
                  height="28px"
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl paddingTop="4" isInvalid={!!errors.time}>
                <FormLabel>学習時間</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    data-testid="study-hour-input"
                    height="28px"
                    width="60px"
                    {...register("time", {
                      required: true,
                      min: 1,
                      max: 24,
                      valueAsNumber: true,
                    })}
                  />
                  <InputRightAddon height="28px">時間</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.time?.type === "required" && "時間は入力必須です"}
                  {(errors.time?.type === "min" ||
                    errors.time?.type === "max") &&
                    "時間は1~24の間で入力してください"}
                </FormErrorMessage>
              </FormControl>
              <Flex gap="2" justifyContent="right" pb="4">
                <SecondaryButton label="キャンセル" onClick={onClose} />
                <PrimaryButton label="登録" type="submit" />
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
