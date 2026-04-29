import { Button } from "@chakra-ui/react";

type Props = {
  label: string;
  onClick: () => void;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

export function SecondaryButton(props: Props) {
  const { label, onClick, leftIcon, rightIcon } = props;

  return (
    <Button 
      colorScheme="teal"
      variant="outline"
      onClick={onClick}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {label}
    </Button>
  )
}