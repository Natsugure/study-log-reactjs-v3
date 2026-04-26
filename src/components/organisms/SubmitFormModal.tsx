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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  addRecord: (title: string, time: number) => Promise<void>;
};

type FormValues = {
  studyDetail: string;
  studyHour: number;
};

export function SubmitFormModal(props: Props) {
  const { isOpen, onClose, addRecord } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { studyDetail: "", studyHour: 0 } });

  const onSubmit = (data: FormValues) => {
    addRecord(data.studyDetail, data.studyHour);
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>学習記録 新規登録</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.studyDetail}>
                <FormLabel>学習内容</FormLabel>
                <Input
                  data-testid="study-detail-input"
                  {...register("studyDetail", { required: "内容は入力必須です" })}
                  height="28px"
                />
                <FormErrorMessage>{errors.studyDetail?.message}</FormErrorMessage>
              </FormControl>
              <FormControl paddingTop="4" isInvalid={!!errors.studyHour}>
                <FormLabel>学習時間</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    data-testid="study-hour-input"
                    height="28px"
                    width="60px"
                    {...register("studyHour", {
                      required: true,
                      min: 1,
                      max: 24,
                      valueAsNumber: true,
                    })}
                  />
                  <InputRightAddon height="28px">時間</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.studyHour?.type === "required" && "時間は入力必須です"}
                  {(errors.studyHour?.type === "min" || errors.studyHour?.type === "max") &&
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
