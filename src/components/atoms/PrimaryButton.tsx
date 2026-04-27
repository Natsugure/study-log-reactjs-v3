import { Button } from "@chakra-ui/react";

type Props = {
  label: string;
  onClick?: () => void;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  type?: "button" | "submit" | "reset";
};

export function PrimaryButton(props: Props) {
  const { label, onClick, leftIcon, rightIcon, type } = props;

  return (
    <Button 
      colorScheme="teal"
      onClick={onClick}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      type={type}
    >
      {label}
    </Button>
  )
}