import { Button } from "@chakra-ui/react";

type Props = {
  label: string;
  onClick: () => void;
};

export function PrimaryButton(props: Props) {
  const { label, onClick } = props;

  return (
    <Button colorScheme="teal" onClick={onClick}>{label}</Button>
  )
}