import { Box, Spinner, Text } from "@chakra-ui/react";

export function LoadingOverlay() {
  return (
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
  );
}
